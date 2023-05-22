import { Injectable } from '@nestjs/common';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Injectable()
export class AuthService {
    login(loginCustomerDto: LoginCustomerDto) {
        return '';
    }

    refresh(token: string) {
        return '';
    }
}
