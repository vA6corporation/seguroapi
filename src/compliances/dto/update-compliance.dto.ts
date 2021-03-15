import { IsNotEmpty } from 'class-validator';

export class UpdateComplianceDto {

  @IsNotEmpty()
  readonly policyNumber!: string;

  @IsNotEmpty()
  readonly object!: string;

  @IsNotEmpty()
  readonly price!: number;
  
  @IsNotEmpty()
  readonly startDate!: string;

  @IsNotEmpty()
  readonly endDate!: string;
  
  @IsNotEmpty()
  readonly customerId!: string;

  @IsNotEmpty()
  readonly financierId!: string;

  @IsNotEmpty()
  readonly beneficiaryId!: string;

  readonly partnershipId!: string;
}