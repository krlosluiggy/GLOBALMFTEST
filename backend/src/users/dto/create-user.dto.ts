import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  program_id: number;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
