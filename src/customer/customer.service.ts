import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryFindCustomer } from './dto/query-find-customer.dto';
import { CustomerRepository } from './repository/customer.repository';
import NotFoundError from 'errors/NotFoundError';

@Injectable()
export class CustomerService {
    constructor(private readonly repository: CustomerRepository) {}

    async find(queryFindCustomer: QueryFindCustomer) {
        return this.repository.find(queryFindCustomer);
    }

    async findOne(id: string) {
        return this.repository.findOne(id).then(customer => {
            if (!customer) throw new NotFoundError(`id ${id} not found`);

            return customer;
        });
    }

    async create(createCustomerDto: CreateCustomerDto) {
        await this.repository.create(createCustomerDto);
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        await this.repository.update(id, updateCustomerDto);
    }

    async remove(id: string) {
        await this.repository.remove(id);
    }
}
