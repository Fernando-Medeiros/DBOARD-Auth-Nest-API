import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CryptPassword } from 'helpers/crypt-password';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CustomerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(id: string): Promise<Partial<Customer>> {
        return this.prisma.customer.findFirst({
            where: { id },
            select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
        });
    }

    async register(dto: CreateCustomerDto): Promise<Customer> {
        const hashPassword = await CryptPassword.hash(dto);
        dto.password = hashPassword;

        return this.prisma.customer.create({ data: dto });
    }

    async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
        return this.prisma.customer.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string): Promise<Customer> {
        return this.prisma.customer.delete({ where: { id } });
    }
}
