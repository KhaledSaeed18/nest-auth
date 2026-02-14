import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    imports: [forwardRef(() => UsersModule)],
    exports: [AuthGuard],
})
export class AuthModule {}
