import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './swagger/swagger.module.config';
import { BadRequestInterceptor } from 'interceptors/badrequest.interceptor';
import { DatabaseInterceptor } from 'interceptors/database.interceptor';
import { NotFoundInterceptor } from 'interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from 'interceptors/unauthorized.interceptor';
import { JsonWebTokenInterceptor } from 'interceptors/jsonwebtoken.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: process.env.CORS_ORIGIN });

    new SwaggerConfig(app).setup();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalInterceptors(
        ...[
            new DatabaseInterceptor(),
            new UnauthorizedInterceptor(),
            new NotFoundInterceptor(),
            new BadRequestInterceptor(),
            new JsonWebTokenInterceptor(),
        ],
    );

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
