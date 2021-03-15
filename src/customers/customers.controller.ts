import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReadCustomerDto } from './dto/read-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {

  constructor(
    private customersService: CustomersService,
  ) { }

  @Get('byAny/:key')
  async getCustomersByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadCustomerDto[]> {
    try {
      return await this.customersService.findCustomersByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getCustomers(
    @Param('pageIndex') pageIndex: number, 
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadCustomerDto[]> {
    return await this.customersService.findCustomersByPage(pageIndex, pageSize, user.businessId);
  }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.customersService.count(user.businessId);
  }

  @Get(':customerId')
  async getCustomerById(@Param('customerId') customerId: string): Promise<ReadCustomerDto> {
    try {
      return await this.customersService.findCustomerById(customerId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(
    @Body('customer') createCustomerDto: CreateCustomerDto
  ): Promise<ReadCustomerDto> {
    try {
      return await this.customersService.create(createCustomerDto);  
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':customerId')
  async update(
    @Body('customer') updateCustomerDto: UpdateCustomerDto, 
    @Param('customerId') customerId: string
  ): Promise<ReadCustomerDto> {
    try {
      return await this.customersService.update(updateCustomerDto, customerId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Delete(':id')
  // deleteCustomer(@Param('id') id): string {
  //   return 'eliminando producto ' + id;
  // }
}
