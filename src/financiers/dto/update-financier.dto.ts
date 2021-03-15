import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateFinancierDto {
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

}