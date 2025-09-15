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
export declare class NotesService {
    private readonly noteRepository;
    constructor(noteRepository: Repository<Note>);
    create(createNoteDto: CreateNoteDto): Promise<Note>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Note>>;
    findOne(id: number): Promise<Note>;
    update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note>;
    remove(id: number): Promise<void>;
}
