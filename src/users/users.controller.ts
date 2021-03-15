import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  
  constructor(
    private usersService: UsersService,
  ) { }

  @Get(':pageIndex/:pageSize')
  async getUsers(
    @Param('pageIndex') pageIndex: number, 
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadUserDto[]> {
    return await this.usersService.findUsersByPage(pageIndex, pageSize, user.businessId);
  }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.usersService.count(user.businessId);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<ReadUserDto> {
    return await this.usersService.findUserById(userId);
  }

  @Post()
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<ReadUserDto> {
    try {
      const foundUser = await this.usersService.findUserByEmail(createUserDto.email);
      if (foundUser) {
        throw new Error('Existe un usuario con este mismo email');
      } else {
        return await this.usersService.create(createUserDto);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':userId')
  async updateUser(@Body('user') updateUserDto: UpdateUserDto, @Param('userId') userId: string): Promise<ReadUserDto> {
    try {
      return await this.usersService.update(updateUserDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
