import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(query: { id?: string; email?: string }): Promise<Partial<CustomerEntity>> {
        return this.prisma.customer.findUnique({
            where: query,
            select: { id: true, password: true },
        });
    }
}
