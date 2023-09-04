import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionService } from './session.service';
import { SessionStrategy } from './strategy/session.strategy';
import { SessionRepository } from './repository/session.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),

        PassportModule,
    ],

    providers: [PrismaService, SessionRepository, SessionService, SessionStrategy],

    exports: [SessionRepository, SessionService],
})
export class SessionModule {}
