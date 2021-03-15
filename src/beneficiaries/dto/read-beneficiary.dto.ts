import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";
import { Partnership } from "src/schemas/partnership.schema";

@Exclude()
export class ReadBeneficiaryDto {
  @Expose()
  readonly _id!: Types.ObjectId;
  
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
  readonly partnership!: Partnership;

  @Expose()
  readonly partnershipId!: string;

}