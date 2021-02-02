import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from 'src/schemas/business.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  
  _id!: Types.ObjectId;
  
  @Prop({ required: true, enum: ['DNI', 'RUC', 'CE'] })
  typeDocument!: string;

  @Prop({ required: true })
  document!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ type: Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);