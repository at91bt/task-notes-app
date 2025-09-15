import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Note } from '../notes/entities/note.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbType = process.env.DB_TYPE || 'memory';
    
    console.log(`🗄️  Database Mode: ${dbType.toUpperCase()}`);
    
    switch (dbType) {
      case 'postgres':
        return {
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT) || 5432,
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'password',
          database: process.env.DB_DATABASE || 'notes_db',
          entities: [Note],
          synchronize: true,
          logging: false,
        };
        
      case 'sqlite':
        return {
          type: 'sqlite',
          database: process.env.SQLITE_DATABASE || 'notes.db',
          entities: [Note],
          synchronize: true,
          logging: false,
        };
        
      case 'memory':
      default:
        return {
          type: 'sqlite',
          database: ':memory:',
          entities: [Note],
          synchronize: true,
          logging: false,
          // Add some seed data for in-memory database
          dropSchema: true,
        };
    }
  }
}