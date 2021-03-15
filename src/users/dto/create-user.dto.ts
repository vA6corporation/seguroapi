import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  
  @IsOptional()
  readonly name!: string;

  @MaxLength(240, { message: 'Email is too long' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email!: string;

  @MaxLength(240, { message: 'Passoword is too long' })
  @IsNotEmpty({ message: 'Password is required' })
  readonly password!: string;

  @IsNotEmpty()
  readonly allGuaranties!: boolean;

  @IsNotEmpty()
  businessId!: string;
}