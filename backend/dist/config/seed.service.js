"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("../notes/entities/note.entity");
let SeedService = class SeedService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async onModuleInit() {
        const dbType = process.env.DB_TYPE || 'memory';
        if (dbType === 'memory') {
            await this.seedData();
        }
    }
    async seedData() {
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
            ];
            for (const noteData of seedNotes) {
                const note = this.noteRepository.create(noteData);
                await this.noteRepository.save(note);
            }
            console.log('Seeded 11 sample notes for pagination demo');
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map