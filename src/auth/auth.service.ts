import { Injectable } from '@nestjs/common';
import { SessionService } from '@/session/session.service';
import { CryptPassword } from 'helpers/crypt-password';
import { SignInDTO } from './dto/signIn.dto';
import { TokenDTO } from './dto/token.dto';
import NotFoundError from 'errors/NotFoundError';
import UnauthorizedError from 'errors/UnauthorizedError';

@Injectable()
export class AuthService {
    constructor(private readonly service: SessionService) {}

    async signin(dto: SignInDTO): Promise<TokenDTO> {
        const customer = await this.service.validateCustomer(dto);

        if (!customer || !(await CryptPassword.compare(dto.password, customer.password))) {
            throw new NotFoundError('Invalid Email or Password');
        }

        const token = await this.service.createAccessToken({ sub: customer.id });

        return { token, type: 'bearer' };
    }

    async refresh(refreshToken: string): Promise<TokenDTO> {
        const { sub } = await this.service.validateToken(refreshToken);

        const customer = await this.service.validateCustomer({ id: String(sub) });

        if (!customer) throw new UnauthorizedError('Access Token is invalid');

        const token = await this.service.createAccessToken({ sub: customer.id });

        return { token, type: 'bearer' };
    }
}
