import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFinancierDto {

  @IsNotEmpty()
  @MaxLength(250)
  readonly name!: string;
  
  @IsNotEmpty()
  @MaxLength(250)
  readonly email!: string;

  @IsNotEmpty()
  @MaxLength(11)
  readonly ruc!: string;
  
  @IsNotEmpty()
  @MaxLength(12)
  readonly phoneNumber!: string;

  @IsNotEmpty()
  readonly businessId!: string;
}