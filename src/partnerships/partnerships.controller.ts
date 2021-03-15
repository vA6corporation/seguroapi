import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { ReadPartnershipDto } from './dto/read-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
import { PartnershipsService } from './partnerships.service';

@UseGuards(JwtAuthGuard)
@Controller('partnerships')
export class PartnershipsController {

  constructor(
    private partnershipsService: PartnershipsService,
  ) { }

  @Get('byAny/:key')
  async getCustomersByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadPartnershipDto[]> {
    try {
      return await this.partnershipsService.findPartnershipsByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.partnershipsService.count(user.businessId);
  }

  @Get(':partnershipId')
  async getPartnershipById(
    @Param('partnershipId') partnershipId: string,
  ): Promise<ReadPartnershipDto> {
    try {
      return await this.partnershipsService.getPartnershipById(partnershipId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getPartnershipsByPage(
    @Param('pageIndex') pageIndex: number,
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadPartnershipDto[]> {
    return this.partnershipsService.getPartnershipsByPage(pageIndex, pageSize, user.businessId);
  }

  @Post()
  async create(
    @Body('partnership') createPartnershipDto: CreatePartnershipDto,
  ): Promise<ReadPartnershipDto> {
    try {
      return await this.partnershipsService.create(createPartnershipDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':partnershipId')
  async update(
    @Body('partnership') updatePartnershipDto: UpdatePartnershipDto,
    @Param('partnershipId') partnershipId: string,
  ): Promise<ReadPartnershipDto> {
    return await this.partnershipsService.update(updatePartnershipDto, partnershipId);
  }
}
