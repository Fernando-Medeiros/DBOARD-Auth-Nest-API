import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './swagger/swagger.module.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    new SwaggerConfig(app).setup();

    await app.listen(3000);
}
bootstrap();
