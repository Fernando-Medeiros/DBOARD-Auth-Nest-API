import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './swagger/swagger.module.config';
import BaseInterceptor from './common/errors/interceptors/BaseInterceptor';
import { notFoundInterceptor } from './common/errors/interceptors/not-found.interceptor';
import { badRequestInterceptor } from './common/errors/interceptors/bad-request.interceptor';
import { unauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    new SwaggerConfig(app).setup();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalInterceptors(
        (new BaseInterceptor(notFoundInterceptor),
        new BaseInterceptor(badRequestInterceptor),
        new BaseInterceptor(unauthorizedInterceptor)),
    );

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
