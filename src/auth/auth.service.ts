import { Injectable } from '@nestjs/common';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { LoginTokenDto } from './dto/login-token.dto';
import { SessionService } from '@/session/session.service';
import { CryptPassword } from 'helpers/crypt-password';
import NotFoundError from 'errors/NotFoundError';
import UnauthorizedError from 'errors/UnauthorizedError';

@Injectable()
export class AuthService {
    constructor(private readonly service: SessionService) {}

    async login(loginCustomerDto: LoginCustomerDto): Promise<LoginTokenDto> {
        const customer = await this.service.validateCustomer(loginCustomerDto);

        if (
            !customer ||
            !(await CryptPassword.compare(loginCustomerDto.password, customer.password))
        ) {
            throw new NotFoundError('Invalid Email or Password');
        }

        const token = await this.service.createAccessToken({ sub: customer.id });

        return { token, type: 'bearer' };
    }

    async refresh(refreshToken: string): Promise<LoginTokenDto> {
        const { sub } = await this.service.validateToken(refreshToken);

        const customer = await this.service.validateCustomer({ id: String(sub) });

        if (!customer) throw new UnauthorizedError('Access Token is invalid');

        const token = await this.service.createAccessToken({ sub: customer.id });

        return { token, type: 'bearer' };
    }
}
