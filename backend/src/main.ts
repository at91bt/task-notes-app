import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
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