import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    controllers: [CustomerController],
    providers: [PrismaService, CustomerService],
})
export class CustomerModule {}
