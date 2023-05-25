import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodemailerService } from './nodemailer.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.NODEMAILER_HOST,
                port: +process.env.NODEMAILER_PORT,
                secure: true,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                },
            },
        }),
    ],
    providers: [NodemailerService],
    exports: [MailerModule, NodemailerService],
})
export class NodemailerModule {}
