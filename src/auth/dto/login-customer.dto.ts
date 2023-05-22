import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCustomerDto {
    @ApiProperty({ description: 'Email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
