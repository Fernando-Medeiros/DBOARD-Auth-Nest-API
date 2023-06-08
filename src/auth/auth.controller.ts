import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from './dto/login-customer.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() loginCustomerDto: LoginCustomerDto) {
        return this.authService.login(loginCustomerDto);
    }

    @Post('refresh/:token')
    @HttpCode(200)
    refresh(@Param('token') token: string) {
        return this.authService.refresh(token);
    }
}
