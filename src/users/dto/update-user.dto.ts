import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(250, { message: 'Business name is too long' })
  @IsNotEmpty({ message: 'Business name is required' })
  readonly name!: string;

  @MaxLength(250, { message: 'Email is too long' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email!: string;

  @MaxLength(250, { message: 'Password is too long' })
  @IsNotEmpty({ message: 'Password is required' })
  readonly password!: string;

  @IsNotEmpty({ message: 'BusinessId is required' })
  readonly businessId!: string;
}