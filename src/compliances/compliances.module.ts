import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Compliance, ComplianceSchema } from 'src/schemas/compliance.schema';
import { CompliancesController } from './compliances.controller';
import { CompliancesService } from './compliances.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Compliance.name, schema: ComplianceSchema }]),
  ],
  controllers: [
    CompliancesController,
  ],
  providers: [
    CompliancesService,
  ],
  exports: [CompliancesService],
})
export class CompliancesModule {}
