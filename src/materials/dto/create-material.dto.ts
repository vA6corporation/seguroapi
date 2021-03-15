import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaterialDto {

  @IsNotEmpty()
  readonly price!: number;
  
  @IsNotEmpty()
  readonly policyNumber!: string;

  @IsNotEmpty()
  readonly object!: string;

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

  @IsOptional()
  readonly partnershipId!: string;

  @IsNotEmpty()
  readonly userId!: string;

  @IsNotEmpty()
  readonly businessId!: string;
}