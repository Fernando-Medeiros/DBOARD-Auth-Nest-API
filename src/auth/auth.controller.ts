import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from './dto/login-customer.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginCustomerDto: LoginCustomerDto) {
        return this.authService.login(loginCustomerDto);
    }

    @Post('refresh/:token')
    refresh(@Param('token') token: string) {
        return this.authService.refresh(token);
    }
}
