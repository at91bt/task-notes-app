import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../notes/entities/note.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async onModuleInit() {
    const dbType = process.env.DB_TYPE || 'memory';
    
    // Only seed data for in-memory database
    if (dbType === 'memory') {
      await this.seedData();
    }
  }

  private async seedData() {
    const existingNotes = await this.noteRepository.count();
    
    if (existingNotes === 0) {
      const seedNotes = [
        {
          title: 'App Config',
          content: 'If dbType = memory, all the content will be reseted once the application server is restarted. '
        },
        {
          title: 'Application Idea',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet purus a nunc ultrices viverra.'
        },
        {
          title: 'Database Concept',
          content: 'Suspendisse potenti. Nullam malesuada augue in neque porta, at facilisis lacus dignissim.'
        },
        {
          title: 'System Design',
          content: 'Curabitur lacinia, sapien a commodo luctus, justo ipsum iaculis purus, vel euismod nunc risus et neque.'
        },
        {
          title: 'Mobile Feature',
          content: 'Vivamus posuere est sed metus egestas, eu blandit risus fermentum. Donec sit amet magna vel lacus tempor feugiat.'
        },
        {
          title: 'Frontend Module',
          content: 'Aliquam erat volutpat. Fusce ullamcorper, nunc non fringilla facilisis, libero risus eleifend justo, nec suscipit nisl metus vel leo.'
        },
        {
          title: 'API Endpoint',
          content: 'Praesent et orci ut nunc sagittis venenatis. Sed dignissim risus nec turpis feugiat malesuada.'
        },
        {
          title: 'Refactor Task',
          content: 'Mauris varius, sapien a aliquam rhoncus, elit ex pulvinar est, sed fermentum metus elit ac neque.'
        },
        {
          title: 'Analytics Dashboard',
          content: '1. Lorem ipsum dolor\n2. Sit amet consectetur\n3. Adipiscing elit'
        },
        {
          title: 'Authentication Flow',
          content: 'Ut tristique justo in augue mattis, nec commodo massa luctus. Integer tincidunt erat nec neque gravida, sed tincidunt erat accumsan.'
        },
        {
          title: 'Network Layer',
          content: 'Phasellus tincidunt, ligula vel sagittis maximus, ligula massa tristique libero, vitae ullamcorper nunc sem a ligula.'
        }
      ]
      for (const noteData of seedNotes) {
        const note = this.noteRepository.create(noteData);
        await this.noteRepository.save(note);
      }
      
      console.log('Seeded 11 sample notes for pagination demo');
    }
  }
}