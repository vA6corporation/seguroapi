import { Exclude, Expose } from "class-transformer";
import { Types } from "mongoose";

@Exclude()
export class ReadUserDto {
  @Expose()
  readonly _id!: Types.ObjectId;

  @Expose()
  readonly name!: string;

  @Expose()
  readonly password!: string;

  @Expose()
  readonly email!: string;

  @Expose()
  readonly businessId!: string;
}