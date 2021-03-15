import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Direct } from 'src/schemas/direct.schema';
import { User } from 'src/schemas/user.schema';
import { DirectsService } from './directs.service';
import { CreateDirectDto } from './dto/create-direct.dto';
import { ReadDirectDto } from './dto/read-direct.dto';

@UseGuards(JwtAuthGuard)
@Controller('directs')
export class DirectsController {

  constructor(
    private directsService: DirectsService,
  ) { }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.directsService.count(user.businessId);
  }

  @Get('byAny/:key')
  async getCustomersByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadDirectDto[]> {
    try {
      return await this.directsService.findDirectsByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }


  @Get(':pageIndex/:pageSize')
  async getDirects(
    @Param('pageIndex') pageIndex: number, 
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadDirectDto[]> {
    if (user.allGuaranties) {
      return await this.directsService.findDirectsByPage(pageIndex, pageSize, user.businessId);
    } else {
      return await this.directsService.findDirectsByPageByUser(pageIndex, pageSize, user.businessId, user._id);
    }
  }

  @Get(':directId')
  async getDirectById(
    @Param('directId') directId: string,
  ): Promise<ReadDirectDto> {
    try {
      return await this.directsService.findDirectById(directId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body('direct') createDirectDto: CreateDirectDto): Promise<ReadDirectDto> {
    try {
      return await this.directsService.create(createDirectDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':directId')
  async update(
    @Body('direct') direct: Direct,
    @Param('directId') directId: string,
  ): Promise<Direct> {
    try {
      return this.directsService.update(direct, directId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      
    }
  }

}
