import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";
import { Customer } from "src/schemas/customer.schema";

@Exclude()
export class ReadPartnershipDto {
  
  @Expose()
  readonly _id!: Types.ObjectId;
  
  @Expose()
  readonly document!: string;
  
  @Expose()
  readonly name!: string;
  
  @Expose()
  readonly address!: string;
  
  @Expose()
  readonly representative!: string;

  @Expose()
  readonly representativeDocument!: string;

  @Expose()
  readonly customerIds!: string[];

  @Expose()
  readonly customers!: Customer[];

  readonly userId!: string;
  readonly businessId!: string;
}