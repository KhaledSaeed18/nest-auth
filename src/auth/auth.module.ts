import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, RolesGuard],
    imports: [forwardRef(() => UsersModule)],
    exports: [AuthGuard, RolesGuard],
})
export class AuthModule {}
