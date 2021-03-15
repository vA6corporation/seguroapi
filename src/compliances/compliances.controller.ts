import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CompliancesService } from './compliances.service';
import { CreateComplianceDto } from './dto/create-compliance.dto';
import { ReadComplianceDto } from './dto/read-compliance.dto';
import { UpdateComplianceDto } from './dto/update-compliance.dto';

@UseGuards(JwtAuthGuard)
@Controller('compliances')
export class CompliancesController {

  constructor(
    private compliancesService: CompliancesService,
  ) { }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.compliancesService.count(user.businessId);
  }

  @Get('byAny/:key')
  async getCompliancesByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadComplianceDto[]> {
    try {
      return await this.compliancesService.findCompliancesByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getCompliances(
    @Param('pageIndex') pageIndex: number,
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadComplianceDto[]> {
    if (user.allGuaranties) {
      return await this.compliancesService.findComplianceByPage(pageIndex, pageSize, user.businessId);
    } else {
      return await this.compliancesService.findComplianceByPageByUser(pageIndex, pageSize, user.businessId, user._id);
    }
  }

  @Get(':complianceId')
  async getComplianceById(@Param('complianceId') complianceId: string): Promise<ReadComplianceDto> {
    try {
      return await this.compliancesService.findComplianceById(complianceId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body('compliance') createComplianceDto: CreateComplianceDto): Promise<ReadComplianceDto> {
    try {
      return await this.compliancesService.create(createComplianceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':complianceId')
  async update(@Body('compliance') updateComplianceDto: UpdateComplianceDto, @Param('complianceId') complianceId: string): Promise<ReadComplianceDto> {
    try {
      return await this.compliancesService.update(updateComplianceDto, complianceId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
