import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repository/customer.repository';

@Module({
    controllers: [CustomerController],
    providers: [PrismaService, CustomerRepository, CustomerService],
})
export class CustomerModule {}
