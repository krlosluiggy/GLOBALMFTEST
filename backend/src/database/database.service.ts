import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit , OnModuleDestroy {
    private pool: Pool;

    constructor(private configService: ConfigService) {}
    
    async onModuleInit() {
        this.pool = new Pool({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
        });

        try {
            const client = await this.pool.connect();
            await client.query('SELECT 1');
            console.log('Conectado a la base de datos');
            client.release();
        } catch (error) {
            console.error('Conexion fallida a la base de datos', error);
            throw error;
        }
    }
    
    

    async onModuleDestroy() {
        this.pool.end();
        console.log('Desconectado de la base de datos captado por onModuleDestroy');
    }


    async query(text: string, params?: any[]):Promise<QueryResult> {
        
        const client = await this.pool.connect();
        try {
            const res = await client.query(text, params);
            return res;
        } catch (error) {
            console.error('Error al ejecutar query', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async getClient() {
        return this.pool.connect();
    }
}
