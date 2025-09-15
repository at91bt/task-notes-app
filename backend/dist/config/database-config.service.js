"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigService = void 0;
const common_1 = require("@nestjs/common");
const note_entity_1 = require("../notes/entities/note.entity");
let DatabaseConfigService = class DatabaseConfigService {
    createTypeOrmOptions() {
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
                    entities: [note_entity_1.Note],
                    synchronize: true,
                    logging: false,
                };
            case 'sqlite':
                return {
                    type: 'sqlite',
                    database: process.env.SQLITE_DATABASE || 'notes.db',
                    entities: [note_entity_1.Note],
                    synchronize: true,
                    logging: false,
                };
            case 'memory':
            default:
                return {
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [note_entity_1.Note],
                    synchronize: true,
                    logging: false,
                    dropSchema: true,
                };
        }
    }
};
exports.DatabaseConfigService = DatabaseConfigService;
exports.DatabaseConfigService = DatabaseConfigService = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfigService);
//# sourceMappingURL=database-config.service.js.map