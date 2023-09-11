import { Injectable } from '@nestjs/common';
import { Customer } from '@/customer/entities/customer.entity';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SessionRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(query: { id?: string; email?: string }): Promise<Partial<Customer>> {
        const { id, email } = query;

        return this.prisma.customer.findFirst({
            where: { OR: [id && { id }, email && { email }] },
            select: { id: true, email: true, password: true },
        });
    }
}
