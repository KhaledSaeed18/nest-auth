import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
    async create(registerDto: RegisterDto) {
        const user = registerDto;
        user.password = await bcrypt.hash(registerDto.password, 12);
        return this.usersService.create(user);
    }
}
