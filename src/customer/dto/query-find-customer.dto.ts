import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryFindCustomer {
    @IsString()
    @IsOptional()
    limit?: string = '10';

    @IsString()
    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    order?: 'asc' | 'desc' = 'asc';

    @IsOptional()
    @IsEnum({
        id: 'id',
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName',
        createdAt: 'createdAt',
    })
    sort?: 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' = 'createdAt';
}
