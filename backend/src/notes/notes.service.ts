import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    // Additional validation
    const title = createNoteDto.title?.trim();
    const content = createNoteDto.content?.trim() || '';

    if (!title) {
      throw new BadRequestException('Title cannot be empty');
    }

    if (title.length > 50) {
      throw new BadRequestException('Title must not exceed 50 characters');
    }

    if (content.length > 500) {
      throw new BadRequestException('Content must not exceed 500 characters');
    }

    const note = this.noteRepository.create({
      title,
      content,
    });
    
    return await this.noteRepository.save(note);
  }

  async findAll(page: number = 1, limit: number = 5): Promise<PaginatedResult<Note>> {
    // Ensure positive values
    page = Math.max(1, page);
    limit = Math.max(1, Math.min(50, limit)); // Max 50 per page

    const [data, total] = await this.noteRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    
    // Additional validation for updates
    if (updateNoteDto.title !== undefined) {
      const title = updateNoteDto.title.trim();
      if (!title) {
        throw new BadRequestException('Title cannot be empty');
      }
      if (title.length > 50) {
        throw new BadRequestException('Title must not exceed 50 characters');
      }
      updateNoteDto.title = title;
    }

    if (updateNoteDto.content !== undefined) {
      const content = updateNoteDto.content.trim();
      if (content.length > 500) {
        throw new BadRequestException('Content must not exceed 500 characters');
      }
      updateNoteDto.content = content;
    }
    
    Object.assign(note, updateNoteDto);
    return await this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }
}