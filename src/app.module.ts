require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BusinessesModule } from './businesses/businesses.module';
import { FinanciersModule } from './financiers/financiers.module';
import { CustomersModule } from './customers/customers.module';
import { MaterialsModule } from './materials/materials.module';
import { DirectsModule } from './directs/directs.module';
import { CompliancesModule } from './compliances/compliances.module';
import { PartnershipsModule } from './partnerships/partnerships.module';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { MailsModule } from './mails/mails.module';
import { ReportsModule } from './reports/reports.module';
let mongoString: string;

if (process.env.NODE_ENV === 'production') {
  mongoString = process.env.DB_HOST || '';
} else {
  mongoString = process.env.DB_HOST_DEV || '';
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoString),
    AuthModule, 
    UsersModule,
    BusinessesModule,
    FinanciersModule,
    CustomersModule,
    MaterialsModule,
    DirectsModule,
    CompliancesModule,
    PartnershipsModule,
    BeneficiariesModule,
    MailsModule,
    ReportsModule,
  ],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
