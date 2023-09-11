import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    HttpCode,
    UseGuards,
    Request,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer Controller')
@Controller('api/v1/customers')
export class CustomerController {
    constructor(private readonly service: CustomerService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: Customer })
    @ApiOperation({ summary: 'get a customer' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    findOne(@Request() req) {
        return this.service.findOne(req.user?.id);
    }

    @Post()
    @ApiOperation({ summary: 'register a customer' })
    @ApiCreatedResponse({ description: 'success', type: null })
    @ApiBadRequestResponse({ description: 'bad request' })
    @HttpCode(201)
    register(@Body() dto: CreateCustomerDto) {
        return this.service.register(dto);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'update a customer' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    update(@Request() req, @Body() dto: UpdateCustomerDto) {
        return this.service.update(req.user?.id, dto);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'remove a customer' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    remove(@Request() req) {
        return this.service.remove(req.user?.id);
    }
}
