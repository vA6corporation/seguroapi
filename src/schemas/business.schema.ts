import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BusinessDocument = Business & Document;

@Schema({ timestamps: true })
export class Business {
  _id!: Types.ObjectId;
  
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  document!: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);