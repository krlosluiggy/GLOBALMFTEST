import { IsNotEmpty, IsString, IsDateString, IsIn, IsOptional } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsIn(['active', 'inactive', 'completed'])
  @IsNotEmpty()
  status: string;
}
