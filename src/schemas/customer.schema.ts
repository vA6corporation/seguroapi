import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from 'src/schemas/business.schema';
import { Partnership } from './partnership.schema';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  
  _id!: Types.ObjectId;
  
  @Prop({ type: String, required: true, enum: ['DNI', 'RUC', 'CE'] })
  typeDocument!: string;

  @Prop({ type: String, required: true })
  document!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, default: null })
  mobileNumber!: string;
  
  @Prop({ type: String, default: null })
  phoneNumber!: string;

  @Prop({ type: String, default: null })
  annexed!: string;

  @Prop({ type: String, default: null })
  address!: String;
  
  @Prop({ type: Date, default: null })
  birthDate!: string;

  @Prop({ type: String, default: null })
  representative!: string;

  @Prop({ type: String, default: null })
  representativeDocument!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId!: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('partnership', {
  ref: Partnership.name,
  localField: 'partnershipId',
  foreignField: '_id',
  justOne: true,
});