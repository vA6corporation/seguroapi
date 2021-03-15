import { Injectable } from '@nestjs/common';
import { CompliancesService } from 'src/compliances/compliances.service';
import { DirectsService } from 'src/directs/directs.service';
import { MaterialsService } from 'src/materials/materials.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly materialsService: MaterialsService,
    private readonly directsService: DirectsService,
    private readonly compliancesService: CompliancesService,
  ) { }

  async findGuarantiesByRangeDateByUser(startDate: string, endDate: string, businessId: string, userId: string): Promise<any> {
    const materials = this.materialsService.findMaterialsByRangeEndDateByUser(startDate, endDate, businessId, userId);
    const directs = this.directsService.findDirectsByRangeEndDateByUser(startDate, endDate, businessId, userId);
    const compliances = this.compliancesService.findCompliancesByRangeEndDateByUser(startDate, endDate, businessId, userId);
    return await Promise.all([materials, directs, compliances])
      .then(values => [ ...values[0], ...values[1], ...values[2] ]);
  }

  async findGuarantiesByRangeDate(startDate: string, endDate: string, businessId: string): Promise<any> {
    const materials = this.materialsService.findMaterialsByRangeEndDate(startDate, endDate, businessId);
    const directs = this.directsService.findDirectsByRangeEndDate(startDate, endDate, businessId);
    const compliances = this.compliancesService.findCompliancesByRangeEndDate(startDate, endDate, businessId);
    return await Promise.all([materials, directs, compliances])
      .then(values => [ ...values[0], ...values[1], ...values[2] ]);
  }

}
