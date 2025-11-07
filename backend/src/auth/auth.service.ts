import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    
    const query = 'SELECT * FROM admins WHERE email = $1';
    const result = await this.databaseService.query(query, [email]);

    if (result.rows.length === 0) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const admin = result.rows[0];

   
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    
    const payload = {
      sub: admin.id,
      email: admin.email,
      fullName: admin.full_name,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.full_name,
      },
    };
  }

  async validateUser(email: string) {
    const query = 'SELECT id, email, full_name FROM admins WHERE email = $1';
    const result = await this.databaseService.query(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  async getProfile(userId: number) {
    const query = 'SELECT id, email, full_name, created_at FROM admins WHERE id = $1';
    const result = await this.databaseService.query(query, [userId]);

    if (result.rows.length === 0) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return result.rows[0];
  }
}
