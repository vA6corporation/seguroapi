import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";
import { Beneficiary } from "src/schemas/beneficiary.schema";
import { Customer } from "src/schemas/customer.schema";
import { Financier } from "src/schemas/financier.schema";
import { Partnership } from "src/schemas/partnership.schema";

@Exclude()
export class ReadDirectDto {
  @Expose()
  readonly _id!: Types.ObjectId;
  
  @Expose()
  readonly price!: number;

  @Expose()
  readonly policyNumber!: string;

  @Expose()
  readonly object!: string;

  @Expose()
  readonly startDate!: string;
  
  @Expose()
  readonly endDate!: string;

  @Expose()
  readonly guaranteeType!: string;
  
  @Expose()
  readonly customerId!: string;

  @Expose()
  readonly financierId!: string;

  @Expose()
  readonly beneficiaryId!: string;

  @Expose()
  readonly partnershipId!: string;

  @Expose()
  readonly customer!: Customer;

  @Expose()
  readonly financier!: Financier;

  @Expose()
  readonly beneficiary!: Beneficiary;

  @Expose()
  readonly partnership!: Partnership;
}