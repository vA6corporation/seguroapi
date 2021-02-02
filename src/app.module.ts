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
  ],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
