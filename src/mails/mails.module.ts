import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { MaterialsModule } from 'src/materials/materials.module';
import { DirectsModule } from 'src/directs/directs.module';
import { CompliancesModule } from 'src/compliances/compliances.module';

@Module({
  imports: [
    MaterialsModule,
    DirectsModule,
    CompliancesModule,
  ],
  providers: [
    MailsService,
  ],
  exports: [MailsService],
  controllers: [MailsController],
})
export class MailsModule {}
