import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) { }

  @Get(':startDate/:endDate')
  async getGuaranties(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @CurrentUser() user: User,
  ): Promise<any> {
    if (user.allGuaranties) {
      return await this.reportsService.findGuarantiesByRangeDate(startDate, endDate, user.businessId);
    } else {
      return await this.reportsService.findGuarantiesByRangeDateByUser(startDate, endDate, user.businessId, user._id);
    }
  }
}
