import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(to: string, token: string) {
        await this.mailerService
            .sendMail({
                to: to,
                from: 'noreply@nestjs.com',
                subject: 'Recover Password',
                text: 'Recover Password',
                html: `
                <h2> Reset Password </h2>
                <p>
                  Follow this link to reset the password for your user: <br>
                  This token expires in ${process.env.JWT_EXPIRATION_RECOVER} minutes
                </p>
                <a href="${process.env.URL_RESET_PASSWORD}?token=${token}"> Reset Password</a>`,
            })
            .catch(() => {
                throw new InternalServerErrorException('Server failed to connect to email service');
            });
    }
}
