import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
    @ApiProperty({ description: 'Email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
