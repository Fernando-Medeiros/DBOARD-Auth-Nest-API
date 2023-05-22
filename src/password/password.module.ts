import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
    controllers: [PasswordController],
    providers: [PrismaService, PasswordService],
})
export class PasswordModule {}
