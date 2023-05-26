import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
})
export class AppModule {}
