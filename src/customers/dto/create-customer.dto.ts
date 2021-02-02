import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCustomerDto {

  @IsNotEmpty()
  @MaxLength(3)
  readonly typeDocument!: string;

  @IsNotEmpty()
  @MaxLength(11)
  readonly document!: string;

  @IsNotEmpty()
  @MaxLength(254)
  readonly name!: string;
  
  @IsNotEmpty()
  @MaxLength(254)
  readonly email!: string;
  
  @IsNotEmpty()
  @MaxLength(12)
  readonly phoneNumber!: string;

  @IsNotEmpty()
  readonly businessId!: string;
}