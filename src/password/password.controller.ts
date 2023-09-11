import {
    Body,
    Controller,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PasswordService } from './password.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Password Controller')
@Controller('api/v1/passwords')
export class PasswordController {
    constructor(private readonly service: PasswordService) {}

    @Post()
    @ApiOperation({ summary: 'send email to recover' })
    @ApiCreatedResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @HttpCode(201)
    recover(@Body() dto: RecoverPasswordDto) {
        return this.service.recover(dto);
    }

    @Put(':token')
    @ApiOperation({ summary: 'reset a password' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    reset(@Param('token') token: string, @Body() dto: ResetPasswordDto) {
        return this.service.reset(token, dto);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'update a password' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    update(@Request() req, @Body() dto: UpdatePasswordDto) {
        return this.service.update(req.user?.id, dto);
    }
}
