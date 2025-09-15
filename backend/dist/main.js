"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const dbType = process.env.DB_TYPE || 'memory';
    await app.listen(3001);
    console.log('Notes API running on http://localhost:3001');
    console.log(`Database: ${dbType.toUpperCase()}`);
    console.log('API Documentation: http://localhost:3001/api/notes');
    if (dbType === 'memory') {
        console.log('Tip: Data will reset on server restart');
        console.log('To use persistent storage, change DB_TYPE in .env file');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map