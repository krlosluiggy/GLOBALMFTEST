import {IsEnum, IsInt, IsOptional,IsString,Min} from "class-validator";
import {Type} from "class-transformer";

export class FilterProgramDto {
 @IsOptional()
 @IsInt({message: 'La página debe ser un número entero'})
 @Min(1, {message: 'La página debe ser mayor o igual a 1'})
 @Type(() => Number)
 page?: number=1;

 @IsOptional()
 @IsInt({message: 'El límite debe ser un número entero'})
 @Min(1, {message: 'El límite debe ser mayor o igual a 1'})
 @Type(() => Number)
 limit?: number=10;

 @IsOptional()
@IsString({message: 'El search debe ser un string'})
 search?: string;

 @IsOptional()
 @IsString({message: 'El status debe ser un string'})
 @IsEnum(['active', 'inactive', 'completed'], {message: 'El status debe ser active, inactive o completed'})
 status?: string;
}