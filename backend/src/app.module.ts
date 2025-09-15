import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    NotesModule,
  ],
})
export class AppModule {}