import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
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
  
  readonly mobileNumber!: string;

  readonly phoneNumber!: string;

  readonly annexed!: string;

  readonly address!: string;

  readonly birthDate!: string;

  readonly representative!: string;
}