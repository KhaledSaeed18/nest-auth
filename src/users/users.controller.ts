import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/types/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOkResponse({
        description: 'List of users',
        type: [User],
    })
    @Get()
    findAll(
        @Query('name') name?: string,
        @Query('size', new ParseIntPipe({ optional: true })) size?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    ) {
        return this.usersService.findAll(name, size, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    // Endpoint for file upload
    // This endpoint allows users to upload a media file. The file is stored in the 'uploads' directory with a unique name.
    // The response includes the original filename, size, and MIME type of the uploaded file.
    // FileInterceptor is used to handle the file upload, and diskStorage is configured to specify the destination and filename for the uploaded files.
    @Post('media')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (_req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const extension = file.originalname.split('.').pop();
                    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
            fileFilter: (_req, file, cb) => {
                // Allow only image and video files
                // This regex checks for common image and video MIME types
                if (
                    file.mimetype.match('^.+/(jpg|webp|jpeg|png|gif|mp4|avi)$')
                ) {
                    cb(null, true);
                } else {
                    cb(
                        new BadRequestException(
                            'Only image and video files are allowed',
                        ),
                        false,
                    );
                }
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            filename: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        };
    }
}
