import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { ReadBeneficiaryDto } from './dto/read-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@UseGuards(JwtAuthGuard)
@Controller('beneficiaries')
export class BeneficiariesController {

  constructor(
    private beneficiariesService: BeneficiariesService,
  ) { }

  @Get('byAny/:key')
  async getBeneficiariesByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadBeneficiaryDto[]> {
    try {
      return await this.beneficiariesService.findBeneficiariesByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getBeneficiariesByPage(
    @Param('pageIndex') pageIndex: number,
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadBeneficiaryDto[]> {
    return this.beneficiariesService.findBeneficiariesByPage(pageIndex, pageSize, user.businessId);
  }

  @Get('count')
  async getCount(
    @CurrentUser() user: User,
  ): Promise<number> {
    return await this.beneficiariesService.count(user.businessId);
  }

  @Get(':beneficiaryId')
  async getBeneficiaryById(
    @Param('beneficiaryId') beneficiaryId: string,
  ): Promise<ReadBeneficiaryDto> {
    try {
      return await this.beneficiariesService.findBeneficiaryById(beneficiaryId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(
    @Body('beneficiary') createBeneficiaryDto: CreateBeneficiaryDto,
  ): Promise<ReadBeneficiaryDto> {
    try {
      return await this.beneficiariesService.create(createBeneficiaryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':beneficiaryId')
  async update(
    @Body('beneficiary') updateBeneficiaryDto: UpdateBeneficiaryDto,
    @Param('beneficiaryId') beneficiaryId: string,
  ): Promise<ReadBeneficiaryDto> {
    try {
      return await this.beneficiariesService.update(updateBeneficiaryDto, beneficiaryId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
