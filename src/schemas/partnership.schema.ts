import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from 'src/schemas/business.schema';
import * as mongoose from 'mongoose';
import { Customer } from './customer.schema';
import { User } from './user.schema';

export type PartnershipDocument = Partnership & Document;

@Schema({ timestamps: true })
export class Partnership {
  
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true })
  document!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  address!: string;

  @Prop({ type: String, default: null })
  representative!: string;

  @Prop({ type: String, default: null })
  representativeDocument!: string;

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' } ] })
  customerIds!: string[];

  customers!: Customer[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;

}

export const PartnershipSchema = SchemaFactory.createForClass(Partnership);

PartnershipSchema.set('toObject', { virtuals: true });

PartnershipSchema.virtual('customers', {
  ref: 'Customer',
  localField: 'customerIds',
  foreignField: '_id',
  justOne: false,
});

