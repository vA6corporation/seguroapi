import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";

@Exclude()
export class ReadCustomerDto {
  @Expose()
  readonly _id!: Types.ObjectId;
  
  @Expose()
  readonly typeDocument!: string;
  
  @Expose()
  readonly document!: string;
  
  @Expose()
  readonly name!: string;
  
  @Expose()
  readonly email!: string;
  
  @Expose()
  readonly mobileNumber!: string;

  @Expose()
  readonly phoneNumber!: string;

  @Expose()
  readonly annexed!: string;

  @Expose()
  readonly address!: string;

  @Expose()
  readonly birthDate!: string;

  @Expose()
  readonly representative!: string;
  
  @Expose()
  readonly representativeDocument!: string;
}