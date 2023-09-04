import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionService } from '@/session/session.service';
import { SessionModule } from '@/session/session.module';

@Module({
    imports: [SessionModule],
    controllers: [AuthController],
    providers: [SessionService, AuthService],
})
export class AuthModule {}
