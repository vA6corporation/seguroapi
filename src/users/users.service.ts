import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = new this.userModel(createUserDto);
    await user.save();
    return plainToClass(ReadUserDto, user.toObject());
  }

  async update(updateUserDto: UpdateUserDto, userId: string): Promise<ReadUserDto> {
    const foundUser = await this.findUserByEmail(updateUserDto.email);
    if (foundUser && !foundUser._id.equals(userId)) {
      throw new Error("Existe un usuario con el mismo email");
    } else {
      await this.userModel.updateOne({ _id: userId }, updateUserDto);
      return plainToClass(ReadUserDto, updateUserDto);
    }
  }

  async count(businessId: string): Promise<number> {
    return this.userModel.countDocuments({ businessId });
  }

  async findUserById(userId: string): Promise<ReadUserDto> {
    const foundUser = await this.userModel.findOne({ _id: userId });
    if (foundUser) {
      return plainToClass(ReadUserDto, foundUser);
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findUserByEmail(email: string): Promise<ReadUserDto|null> {
    const foundUser = await this.userModel.findOne({ email });
    if (foundUser) {
      return plainToClass(ReadUserDto, foundUser);
    } else {
      return null;
    }
  }

  async findUsersByPage(
    pageIndex: number, 
    pageSize: number, 
    businessId: string
  ): Promise<ReadUserDto[]> {
    const foundUsers = await this.userModel.find({ businessId })
      .sort('-createdAt')
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundUsers.map(user => plainToClass(ReadUserDto, user.toObject()));
  }
}
