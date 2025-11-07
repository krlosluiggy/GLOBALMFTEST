import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProgramDto: CreateProgramDto) {
    const { name, description, start_date, status } = createProgramDto;

    const insertQuery = `
      INSERT INTO programs (name, description, start_date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await this.databaseService.query(insertQuery, [
      name,
      description,
      start_date,
      status,
    ]);

    return result.rows[0];
  }

 async findAll(filterDto: FilterProgramDto) {
    const { page = 1, limit = 10, search, status } = filterDto;
    const offset = (page - 1) * limit;

   
    let query = 'SELECT * FROM programs WHERE 1=1';
    const values: any[] = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND name ILIKE $${paramIndex}`;
      values.push(`%${search}%`);
      paramIndex++;
    }


    if (status) {
      query += ` AND status = $${paramIndex}`;
      values.push(status);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(limit, offset);

    const result = await this.databaseService.query(query, values);

   
    let countQuery = 'SELECT COUNT(*) FROM programs WHERE 1=1';
    const countValues: any[] = [];
    let countParamIndex = 1;

    if (search) {
      countQuery += ` AND name ILIKE $${countParamIndex}`;
      countValues.push(`%${search}%`);
      countParamIndex++;
    }

    if (status) {
      countQuery += ` AND status = $${countParamIndex}`;
      countValues.push(status);
    }

    const countResult = await this.databaseService.query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }


  async findOne(id: number) {
    const query = 'SELECT * FROM programs WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`Programa con ID ${id} no encontrado`);
    }

    return result.rows[0];
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const { name, description, start_date, status } = updateProgramDto;

    // Verificar que el programa existe
    await this.findOne(id);

    // Construir la query de actualización dinámicamente
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex}`);
      values.push(name);
      paramIndex++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }

    if (start_date !== undefined) {
      updates.push(`start_date = $${paramIndex}`);
      values.push(start_date);
      paramIndex++;
    }

    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    values.push(id);
    const updateQuery = `
      UPDATE programs
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.databaseService.query(updateQuery, values);
    return result.rows[0];
  }

  async remove(id: number) {
    // Verificar que el programa existe
    await this.findOne(id);

    const deleteQuery = 'DELETE FROM programs WHERE id = $1';
    await this.databaseService.query(deleteQuery, [id]);

    return { message: 'Programa eliminado exitosamente' };
  }

  async getUsersByProgram(programId: number) {
    // Verificar que el programa existe
    await this.findOne(programId);

    const query = `
      SELECT
        u.id,
        u.program_id,
        u.full_name,
        u.email,
        u.created_at
      FROM users u
      WHERE u.program_id = $1
      ORDER BY u.created_at DESC
    `;

    const result = await this.databaseService.query(query, [programId]);
    return result.rows;
  }
}
