import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { PasswordModule } from './password/password.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { RateLimiterModule } from './limiter/rate-limiter.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        RateLimiterModule,
        AuthModule,
        CustomerModule,
        PasswordModule,
        NodemailerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
