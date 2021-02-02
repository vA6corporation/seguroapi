import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadBusinessDto {
  @Expose()
  readonly _id!: string;

  @Expose()
  readonly name!: string;
  
  @Expose()
  readonly ruc!: string;
}