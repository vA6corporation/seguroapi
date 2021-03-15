import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from 'src/schemas/business.schema';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type BeneficiaryDocument = Beneficiary & Document;

@Schema({ timestamps: true })
export class Beneficiary {
  
  _id!: Types.ObjectId;
  
  @Prop({ type: String, required: true })
  document!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  email!: string;

  @Prop({ type: String, default: null })
  mobileNumber!: string;

  @Prop({ type: String, default: null })
  phoneNumber!: string;

  @Prop({ type: String, default: null })
  annexed!: string;

  @Prop({ type: String, default: null })
  address!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;

}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);