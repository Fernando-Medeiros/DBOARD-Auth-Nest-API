import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './repository/customer.repository';
import NotFoundError from 'errors/NotFoundError';

@Injectable()
export class CustomerService {
    constructor(private readonly repository: CustomerRepository) {}

    async create(createCustomerDto: CreateCustomerDto) {
        return this.repository.create(createCustomerDto);
    }

    async find({ limit, order, sort }) {
        return this.repository.find({ limit, order, sort });
    }

    async findOne(id: string) {
        const customer = this.repository.findOne(id);

        if (!customer) throw new NotFoundError('Not found');

        return customer;
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.repository.update(id, updateCustomerDto);

        if (!customer) throw new NotFoundError('Not found');
    }

    async remove(id: string) {
        const customer = await this.repository.remove(id);

        if (!customer) throw new NotFoundError('Not found');
    }
}
