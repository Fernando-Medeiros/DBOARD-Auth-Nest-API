import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { PasswordModule } from './password/password.module';

@Module({
    imports: [AuthModule, CustomerModule, PasswordModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
