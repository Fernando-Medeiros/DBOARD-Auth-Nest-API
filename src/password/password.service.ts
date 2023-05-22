import { Injectable } from '@nestjs/common';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
    recover(recoverPasswordDto: RecoverPasswordDto) {
        return '';
    }

    reset(id: string, resetPasswordDto: ResetPasswordDto) {
        return '';
    }

    update(id: string, updatePasswordDto: UpdatePasswordDto) {
        return '';
    }
}
