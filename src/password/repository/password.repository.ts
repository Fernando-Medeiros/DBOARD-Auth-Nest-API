import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PasswordRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(id: string, updatePasswordDto: UpdatePasswordDto) {
        return this.prisma.customer.update({ where: { id }, data: updatePasswordDto });
    }
}
