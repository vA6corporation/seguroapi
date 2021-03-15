import { IsDate, IsNotEmpty, IsOptional, Max, MaxLength } from 'class-validator';

export class CreateCustomerDto {

  @IsNotEmpty()
  @MaxLength(3)
  readonly typeDocument!: string;

  @IsNotEmpty()
  @MaxLength(11)
  readonly document!: string;

  @IsNotEmpty()
  @MaxLength(240)
  readonly name!: string;
  
  @IsNotEmpty()
  @MaxLength(240)
  readonly email!: string;
  
  @IsOptional()
  @MaxLength(12)
  readonly mobileNumber!: string;

  @IsOptional()
  @MaxLength(12)
  readonly phoneNumber!: string;

  @IsOptional()
  @MaxLength(12)
  readonly annexed!: string;

  @IsOptional()
  @MaxLength(240)
  readonly address!: string;

  @IsOptional()
  @IsDate()
  readonly birthDate!: string;

  @IsOptional()
  @MaxLength(240)
  readonly representative!: string;

  @IsOptional()
  @MaxLength(12)
  readonly representativeDocument!: string;

  @IsNotEmpty()
  readonly userId!: string;

  @IsNotEmpty()
  readonly businessId!: string;
}