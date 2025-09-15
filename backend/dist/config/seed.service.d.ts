import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from '../notes/entities/note.entity';
export declare class SeedService implements OnModuleInit {
    private readonly noteRepository;
    constructor(noteRepository: Repository<Note>);
    onModuleInit(): Promise<void>;
    private seedData;
}
