import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreatePartnershipDto {

  @IsNotEmpty()
  @MaxLength(11)
  readonly document!: string;

  @IsNotEmpty()
  @MaxLength(240)
  readonly name!: string;
  
  @IsOptional()
  @MaxLength(240)
  readonly address!: string;

  @IsOptional()
  @MaxLength(240)
  readonly representative!: string;

  @IsOptional()
  @MaxLength(240)
  readonly representativeDocument!: string;

  @IsNotEmpty()
  readonly customerIds!: string[];

  @IsNotEmpty()
  readonly userId!: string;
  
  @IsNotEmpty()
  readonly businessId!: string;
}