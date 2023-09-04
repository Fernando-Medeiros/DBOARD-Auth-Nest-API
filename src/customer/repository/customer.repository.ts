import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { QueryFindCustomer } from '../dto/query-find-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { CryptPassword } from 'helpers/crypt-password';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CustomerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async find({ limit, order, sort }: QueryFindCustomer): Promise<Partial<CustomerEntity>[]> {
        const orderSort = {
            id: { id: order },
            email: { email: order },
            firstName: { firstName: order },
            lastName: { lastName: order },
            createdAt: { createdAt: order },
        }[sort];

        const query = {
            take: +limit || 10,
            orderBy: orderSort,
            select: { id: true, firstName: true, lastName: true, createdAt: true },
        };

        return this.prisma.customer.findMany({ ...query });
    }

    async findOne(id: string): Promise<Partial<CustomerEntity>> {
        return this.prisma.customer.findFirst({
            where: { id },
            select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
        });
    }

    async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
        const hashPassword = await CryptPassword.hash(createCustomerDto);
        createCustomerDto.password = hashPassword;

        return this.prisma.customer.create({ data: createCustomerDto });
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto,
        });
    }

    async remove(id: string): Promise<CustomerEntity> {
        return this.prisma.customer.delete({ where: { id } });
    }
}
