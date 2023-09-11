import { ApiProperty } from '@nestjs/swagger';
import { Customer as CustomerEntity } from '@prisma/client';

export class Customer implements CustomerEntity {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;

    password: string;

    @ApiProperty()
    createdAt: Date;
}
