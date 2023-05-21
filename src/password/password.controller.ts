import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PasswordService } from './password.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatedPasswordDto } from './dto/update-password.dto';

@Controller('password')
export class PasswordController {
    constructor(private readonly passwordService: PasswordService) {}
    @Post()
    recover(@Body() recoverPasswordDto: RecoverPasswordDto) {
        return this.passwordService.recover(recoverPasswordDto);
    }

    @Patch(':token')
    reset(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.passwordService.reset(token, resetPasswordDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedPasswordDto: UpdatedPasswordDto) {
        return this.passwordService.update(id, updatedPasswordDto);
    }
}
