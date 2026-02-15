import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Swagger configuration (API documentation)
    const config = new DocumentBuilder()
        .setTitle('NestJS Auth API')
        .setDescription('The NestJS Auth API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    // Security middleware, using Helmet to set various HTTP headers for security
    app.use(helmet());

    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
