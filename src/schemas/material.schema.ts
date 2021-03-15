import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Business } from './business.schema';
import { Customer } from './customer.schema';
import { Financier } from './financier.schema';
import { Beneficiary } from './beneficiary.schema';
import { Partnership } from './partnership.schema';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type MaterialDocument = Material & Document;

@Schema({ timestamps: true })
export class Material {
  _id!: string;

  @Prop({ type: String, required: true })
  policyNumber!: string;

  @Prop({ type: String, required: true })
  object!: string;

  @Prop({ type: Number, required: true })
  price!: number;

  @Prop({ type: Date, required: true })
  startDate!: string;

  @Prop({ type: Date, required: true })
  endDate!: any;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customer.name, required: true })
  customerId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Financier.name, required: true })
  financierId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Beneficiary.name, required: true })
  beneficiaryId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Partnership.name, default: null })
  partnershipId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;
  
}

export const MaterialSchema = SchemaFactory.createForClass(Material);

MaterialSchema.set('toObject', { virtuals: true });

MaterialSchema.virtual('guaranteeType').get(function() {
  return 'GAMF';
});

MaterialSchema.virtual('customer', {
  ref: Customer.name,
  localField: 'customerId',
  foreignField: '_id',
  justOne: true,
});

MaterialSchema.virtual('financier', {
  ref: Financier.name,
  localField: 'financierId',
  foreignField: '_id',
  justOne: true,
});

MaterialSchema.virtual('beneficiary', {
  ref: Beneficiary.name,
  localField: 'beneficiaryId',
  foreignField: '_id',
  justOne: true,
});

MaterialSchema.virtual('partnership', {
  ref: Partnership.name,
  localField: 'partnershipId',
  foreignField: '_id',
  justOne: true,
});