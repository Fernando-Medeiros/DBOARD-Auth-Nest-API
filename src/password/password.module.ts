import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { PasswordRepository } from './repository/password.repository';
import { SessionModule } from 'src/session/session.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
    imports: [SessionModule, NodemailerModule],
    controllers: [PasswordController],
    providers: [PrismaService, PasswordRepository, PasswordService],
})
export class PasswordModule {}
