import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 character long' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Content must not exceed 500 characters' })
  content?: string;
}