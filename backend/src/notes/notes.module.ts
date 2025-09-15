import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { DatabaseConfigService } from '../config/database-config.service';
import { SeedService } from '../config/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService, DatabaseConfigService, SeedService],
})
export class NotesModule {}