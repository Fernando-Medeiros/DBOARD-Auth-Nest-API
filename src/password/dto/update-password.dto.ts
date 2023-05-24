import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
    @ApiProperty({ description: 'Password' })
    @IsString()
    @IsNotEmpty()
    @Length(8, 100)
    password: string;
}
