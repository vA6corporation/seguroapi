import { Module } from '@nestjs/common';
import { PartnershipsService } from './partnerships.service';
import { PartnershipsController } from './partnerships.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partnership, PartnershipSchema } from 'src/schemas/partnership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partnership.name, schema: PartnershipSchema }]),
  ],
  providers: [PartnershipsService],
  controllers: [PartnershipsController]
})
export class PartnershipsModule {}
