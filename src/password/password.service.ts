import { Injectable } from '@nestjs/common';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordRepository } from './repository/password.repository';
import { SessionService } from 'src/session/session.service';
import { CryptPassword } from 'helpers/crypt-password';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import UnauthorizedError from 'errors/UnauthorizedError';
import NotFoundError from 'errors/NotFoundError';

@Injectable()
export class PasswordService {
    constructor(
        private readonly repository: PasswordRepository,
        private readonly session: SessionService,
        private readonly mailer: NodemailerService,
    ) {}

    async recover(recoverPasswordDto: RecoverPasswordDto) {
        const customer = await this.session.validateCustomer(recoverPasswordDto);

        if (!customer) throw new NotFoundError(`${recoverPasswordDto.email} not found`);

        const token = await this.session.createRecoverToken({ sub: customer.id, scope: 'recover' });

        await this.mailer.sendMail(customer.email, token);

        return { statusCode: 200, message: 'Email sent, check your mailbox' };
    }

    async reset(token: string, resetPasswordDto: ResetPasswordDto) {
        const { sub, scope } = await this.session.validateToken(token);

        if (scope === 'recover') {
            const hashPassword = await CryptPassword.hash(resetPasswordDto);

            resetPasswordDto.password = hashPassword;

            await this.repository.update(String(sub), resetPasswordDto);
        } else {
            throw new UnauthorizedError();
        }
    }

    async update(id: string, updatePasswordDto: UpdatePasswordDto) {
        const hashPassword = await CryptPassword.hash(updatePasswordDto);

        updatePasswordDto.password = hashPassword;

        await this.repository.update(id, updatePasswordDto);
    }
}
