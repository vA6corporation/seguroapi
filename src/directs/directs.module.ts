import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Direct, DirectSchema } from 'src/schemas/direct.schema';
import { DirectsController } from './directs.controller';
import { DirectsService } from './directs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Direct.name, schema: DirectSchema }]),
  ],
  controllers: [DirectsController],
  providers: [DirectsService],
  exports: [DirectsService],
})
export class DirectsModule {}
