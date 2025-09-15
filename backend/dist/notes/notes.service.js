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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
let NotesService = class NotesService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async create(createNoteDto) {
        const title = createNoteDto.title?.trim();
        const content = createNoteDto.content?.trim() || '';
        if (!title) {
            throw new common_1.BadRequestException('Title cannot be empty');
        }
        if (title.length > 50) {
            throw new common_1.BadRequestException('Title must not exceed 50 characters');
        }
        if (content.length > 500) {
            throw new common_1.BadRequestException('Content must not exceed 500 characters');
        }
        const note = this.noteRepository.create({
            title,
            content,
        });
        return await this.noteRepository.save(note);
    }
    async findAll(page = 1, limit = 5) {
        page = Math.max(1, page);
        limit = Math.max(1, Math.min(50, limit));
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
    async findOne(id) {
        const note = await this.noteRepository.findOne({
            where: { id },
        });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }
    async update(id, updateNoteDto) {
        const note = await this.findOne(id);
        if (updateNoteDto.title !== undefined) {
            const title = updateNoteDto.title.trim();
            if (!title) {
                throw new common_1.BadRequestException('Title cannot be empty');
            }
            if (title.length > 50) {
                throw new common_1.BadRequestException('Title must not exceed 50 characters');
            }
            updateNoteDto.title = title;
        }
        if (updateNoteDto.content !== undefined) {
            const content = updateNoteDto.content.trim();
            if (content.length > 500) {
                throw new common_1.BadRequestException('Content must not exceed 500 characters');
            }
            updateNoteDto.content = content;
        }
        Object.assign(note, updateNoteDto);
        return await this.noteRepository.save(note);
    }
    async remove(id) {
        const note = await this.findOne(id);
        await this.noteRepository.remove(note);
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map