import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

const CustomerProps = {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    createdAt: 'createdAt',
};

enum SortColumns {
    'id',
    'email',
    'firstName',
    'lastName',
    'createdAt',
}
enum OrderBy {
    'asc',
    'desc',
}

export class QueryFindCustomer {
    @ApiPropertyOptional({ description: 'Take Limit', default: 10 })
    @IsString()
    @IsOptional()
    limit?: string = '10';

    @ApiPropertyOptional({
        description: 'Order By',
        default: 'asc',
        enum: ['asc', 'desc'],
    })
    @IsString()
    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    order?: OrderBy;

    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'createdAt',
        enum: CustomerProps,
    })
    @IsOptional()
    @IsEnum(CustomerProps)
    sort?: SortColumns;
}
