import { Body, Controller, Param, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { TokenDTO } from './dto/token.dto';

@ApiTags('Auth Controller')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('token')
    @ApiOkResponse({ type: TokenDTO })
    @ApiOperation({ summary: 'get access token' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    login(@Body() dto: SignInDTO) {
        return this.service.signin(dto);
    }

    @Post('refresh/:token')
    @ApiOkResponse({ type: TokenDTO })
    @ApiOperation({ summary: 'get refresh token' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    refresh(@Param('token') token: string) {
        return this.service.refresh(token);
    }
}
