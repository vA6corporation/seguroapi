import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Business } from './business.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id!: string;

  @Prop({ default: 'Administrador', required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: Types.ObjectId, ref: Business.name, required: true })
  businessId!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);