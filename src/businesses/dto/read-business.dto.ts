import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadBusinessDto {
  @Expose()
  readonly _id!: string;

  @Expose()
  readonly document!: string;
  
  @Expose()
  readonly name!: string;
  
}