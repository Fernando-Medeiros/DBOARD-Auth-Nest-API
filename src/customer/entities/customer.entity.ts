import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
}
