import { UserRole } from 'src/types/role.enum';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ unique: true, nullable: false })
    email: string;

    @ApiProperty()
    @Column({ select: false })
    password: string;

    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @ApiProperty({ default: true })
    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
