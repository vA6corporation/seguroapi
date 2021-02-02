import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from 'src/schemas/business.schema';

export type FinancierDocument = Financier & Document;

@Schema({ timestamps: true })
export class Financier {
  
  _id!: Types.ObjectId;

  @Prop({ required: true })
  ruc!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ type: Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;

}

export const FinancierSchema = SchemaFactory.createForClass(Financier);