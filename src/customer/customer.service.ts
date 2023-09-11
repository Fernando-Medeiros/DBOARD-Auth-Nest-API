import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './repository/customer.repository';
import NotFoundError from 'errors/NotFoundError';

@Injectable()
export class CustomerService {
    constructor(private readonly repository: CustomerRepository) {}

    async findOne(id: string) {
        return this.repository.findOne(id).then(customer => {
            if (!customer) throw new NotFoundError(`id ${id} not found`);

            return customer;
        });
    }

    async register(dto: CreateCustomerDto) {
        await this.repository.register(dto);
    }

    async update(id: string, dto: UpdateCustomerDto) {
        await this.repository.update(id, dto);
    }

    async remove(id: string) {
        await this.repository.remove(id);
    }
}
