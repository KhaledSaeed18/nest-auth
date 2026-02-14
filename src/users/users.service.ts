import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(name?: string, size?: number, limit?: number) {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name.toLowerCase()}%`);
        }
        const [data, total] = await this.userRepository.findAndCount({
            where,
            take: limit,
            skip: (size || 1) * (limit || 10) - (limit || 10),
        });
        return {
            data,
            total,
            page: size || 1,
            limit: limit || 10,
        };
    }

    async findOne(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'name', 'role', 'isActive'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const result = await this.userRepository.update(id, updateUserDto);
        return result;
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return await this.userRepository.softRemove(user);
    }
}
