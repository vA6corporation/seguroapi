import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CreateFinancierDto } from './dto/create-financier.dto';
import { ReadFinancierDto } from './dto/read-financier.dto';
import { UpdateFinancierDto } from './dto/update-financier.dto';
import { FinanciersService } from './financiers.service';

@UseGuards(JwtAuthGuard)
@Controller('financiers')
export class FinanciersController {
  
  constructor(
    private financiersService: FinanciersService,
  ) {}

  @Get('byAny/:key')
  async getFinanciersByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadFinancierDto[]> {
    try {
      return await this.financiersService.findFinanciersByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getFinanciers(
    @Param('pageIndex') pageIndex: number, 
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadFinancierDto[]> {
    return await this.financiersService.findFinanciersByPage(pageIndex, pageSize, user.businessId);
  }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.financiersService.count(user.businessId);
  }

  @Get(':financierId')
  async getFinancierById(@Param('financierId') financierId: string): Promise<ReadFinancierDto|null> {
    return await this.financiersService.findFinancierById(financierId);
  }

  @Post()
  async createFinancier(@Body('financier') createFinancierDto: CreateFinancierDto): Promise<ReadFinancierDto> {
    try {
      return await this.financiersService.create(createFinancierDto);  
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':financierId')
  async updateFinancier(@Body('financier') updateFinancierDto: UpdateFinancierDto, @Param('financierId') financierId: string): Promise<ReadFinancierDto> {
    try {
      return await this.financiersService.update(updateFinancierDto, financierId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
