import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Get,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    create(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    me(@Request() req) {
        return this.authService.me(Number(req.user.id));
    }
}
