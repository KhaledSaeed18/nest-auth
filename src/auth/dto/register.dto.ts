import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    IsOptional,
    IsEnum,
} from 'class-validator';
import { UserRole } from 'src/types/role.enum';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;
}
