import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PasswordService } from './password.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Password')
@Controller('password')
export class PasswordController {
    constructor(private readonly passwordService: PasswordService) {}

    @Post()
    recover(@Body() recoverPasswordDto: RecoverPasswordDto) {
        return this.passwordService.recover(recoverPasswordDto);
    }

    @Put(':token')
    @HttpCode(HttpStatus.NO_CONTENT)
    reset(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.passwordService.reset(token, resetPasswordDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.passwordService.update(id, updatePasswordDto);
    }
}
