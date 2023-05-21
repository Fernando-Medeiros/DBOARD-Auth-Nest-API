import { Injectable } from '@nestjs/common';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { RefreshCustomerDto } from './dto/refresh-customer.dto';

@Injectable()
export class AuthService {
    login(loginCustomerDto: LoginCustomerDto) {
        return '';
    }

    refresh(refreshCustomerDto: RefreshCustomerDto) {
        return '';
    }
}
