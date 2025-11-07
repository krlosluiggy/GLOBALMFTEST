import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { program_id, full_name, email } = createUserDto;

    // Verificar que el programa existe
    const programQuery = 'SELECT id FROM programs WHERE id = $1';
    const programResult = await this.databaseService.query(programQuery, [program_id]);

    if (programResult.rows.length === 0) {
      throw new BadRequestException(`El programa con ID ${program_id} no existe`);
    }

    // Insertar el usuario
    const insertQuery = `
      INSERT INTO users (program_id, full_name, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await this.databaseService.query(insertQuery, [
      program_id,
      full_name,
      email,
    ]);

    return result.rows[0];
  }

  async findAll() {
    const query = `
      SELECT
        u.id,
        u.program_id,
        u.full_name,
        u.email,
        u.created_at,
        p.name as program_name
      FROM users u
      LEFT JOIN programs p ON u.program_id = p.id
      ORDER BY u.created_at DESC
    `;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  async findOne(id: number) {
    const query = `
      SELECT
        u.id,
        u.program_id,
        u.full_name,
        u.email,
        u.created_at,
        p.name as program_name
      FROM users u
      LEFT JOIN programs p ON u.program_id = p.id
      WHERE u.id = $1
    `;
    const result = await this.databaseService.query(query, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return result.rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { program_id, full_name, email } = updateUserDto;

    // Verificar que el usuario existe
    await this.findOne(id);

    // Construir la query de actualización dinámicamente
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (program_id !== undefined) {
      updates.push(`program_id = $${paramIndex}`);
      values.push(program_id);
      paramIndex++;
    }

    if (full_name !== undefined) {
      updates.push(`full_name = $${paramIndex}`);
      values.push(full_name);
      paramIndex++;
    }

    if (email !== undefined) {
      updates.push(`email = $${paramIndex}`);
      values.push(email);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw new BadRequestException('No hay datos para actualizar');
    }

    values.push(id);
    const updateQuery = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.databaseService.query(updateQuery, values);
    return result.rows[0];
  }

  async remove(id: number) {
    // Verificar que el usuario existe
    await this.findOne(id);

    const deleteQuery = 'DELETE FROM users WHERE id = $1';
    await this.databaseService.query(deleteQuery, [id]);

    return { message: 'Usuario eliminado exitosamente' };
  }
}
