import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Business } from './business.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  
  _id!: string;

  @Prop({ type: String, default: 'Administrador' })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: Boolean, required: true })
  allGuaranties!: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);