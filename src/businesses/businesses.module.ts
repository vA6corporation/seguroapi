import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from 'src/schemas/business.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]),
    UsersModule,
  ],
  providers: [
    BusinessesService,
  ],
  controllers: [
    BusinessesController
  ],
  exports: [
    BusinessesService,
  ],
})
export class BusinessesModule {}
