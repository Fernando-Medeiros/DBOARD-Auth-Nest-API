import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(query: { id?: string; email?: string }): Promise<Partial<CustomerEntity>> {
        const { id, email } = query;

        return this.prisma.customer.findUnique({
            where: { id } || { email },
            select: { id: true, email: true, password: true },
        });
    }
}
