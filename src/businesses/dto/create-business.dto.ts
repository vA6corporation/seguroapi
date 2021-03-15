import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBusinessDto {
  @MaxLength(240, { message: 'Business name is too long' })
  @IsNotEmpty({ message: 'Business name is required' })
  readonly name!: string;

  @MaxLength(11, { message: 'RUC N° is too long' })
  @IsNotEmpty({ message: 'RUC N° is required' })
  readonly document!: string;
}