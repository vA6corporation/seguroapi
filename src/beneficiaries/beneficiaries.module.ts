import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Beneficiary, BeneficiarySchema } from 'src/schemas/beneficiary.schema';
import { BeneficiariesController } from './beneficiaries.controller';
import { BeneficiariesService } from './beneficiaries.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Beneficiary.name, schema: BeneficiarySchema }]),
  ],
  controllers: [BeneficiariesController],
  providers: [BeneficiariesService]
})
export class BeneficiariesModule {}
