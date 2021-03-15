import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";
import { ReadBeneficiaryDto } from "src/beneficiaries/dto/read-beneficiary.dto";
import { ReadCustomerDto } from "src/customers/dto/read-customer.dto";
import { ReadFinancierDto } from "src/financiers/dto/read-financier.dto";
import { Partnership } from "src/schemas/partnership.schema";

@Exclude()
export class ReadComplianceDto {
  @Expose()
  readonly _id!: Types.ObjectId;
  
  @Expose()
  readonly policyNumber!: string;

  @Expose()
  readonly object!: string;

  @Expose()
  readonly price!: number;
  
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
  readonly customer!: ReadCustomerDto;

  @Expose()
  readonly financier!: ReadFinancierDto;

  @Expose()
  readonly beneficiary!: ReadBeneficiaryDto;

  @Expose()
  readonly partnership!: Partnership;
}