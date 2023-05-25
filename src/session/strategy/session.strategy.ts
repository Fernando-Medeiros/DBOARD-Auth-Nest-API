import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { SessionService } from '../session.service';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import UnauthorizedError from 'errors/UnauthorizedError';

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly service: SessionService) {
        super({
            jwtFromRequest: service.extractTokenToAuthenticationHeader(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate({ sub }): Promise<Partial<CustomerEntity>> {
        return this.service.validateCustomer({ id: sub }).then(customer => {
            if (!customer) throw new UnauthorizedError();

            return customer;
        });
    }
}
