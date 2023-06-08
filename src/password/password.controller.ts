import {
    Body,
    Controller,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    Request,
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
    @HttpCode(200)
    recover(@Body() recoverPasswordDto: RecoverPasswordDto) {
        return this.passwordService.recover(recoverPasswordDto);
    }

    @Put(':token')
    @HttpCode(204)
    reset(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.passwordService.reset(token, resetPasswordDto);
    }

    @Patch()
    @HttpCode(204)
    @UseGuards(AuthGuard('jwt'))
    update(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.passwordService.update(req.user?.id, updatePasswordDto);
    }
}
