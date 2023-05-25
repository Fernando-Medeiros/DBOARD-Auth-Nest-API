import { Injectable } from '@nestjs/common';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { LoginTokenDto } from './dto/login-token.dto';
import { SessionService } from 'src/session/session.service';
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

        const accessToken = await this.service.createAccessToken({ sub: customer.id });

        return { accessToken, type: 'bearer' };
    }

    async refresh(token: string): Promise<LoginTokenDto> {
        const { sub } = await this.service.validateToken(token);

        const customer = await this.service.validateCustomer({ id: String(sub) });

        if (!customer) throw new UnauthorizedError('Access Token is invalid');

        const accessToken = await this.service.createAccessToken({ sub: customer.id });

        return { accessToken, type: 'bearer' };
    }
}
