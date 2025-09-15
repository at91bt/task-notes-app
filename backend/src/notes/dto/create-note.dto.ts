import { IsNotEmpty, IsString, MaxLength, IsOptional, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(1, { message: 'Title must be at least 1 character long' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Content must not exceed 500 characters' })
  content?: string;
}