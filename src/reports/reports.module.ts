import { Module } from '@nestjs/common';
import { CompliancesModule } from 'src/compliances/compliances.module';
import { DirectsModule } from 'src/directs/directs.module';
import { MaterialsModule } from 'src/materials/materials.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    MaterialsModule,
    CompliancesModule,
    DirectsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
