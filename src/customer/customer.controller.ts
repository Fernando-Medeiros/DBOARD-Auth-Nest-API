import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Query,
    HttpCode,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryFindCustomer } from './dto/query-find-customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    find(@Query() query: QueryFindCustomer) {
        return this.customerService.find(query);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getOwn(@Request() req) {
        return this.customerService.findOne(req.user?.id);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    update(@Request() req, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerService.update(req.user?.id, updateCustomerDto);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    remove(@Request() req) {
        return this.customerService.remove(req.user?.id);
    }
}
