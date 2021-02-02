import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { ReadBusinessDto } from './dto/read-business.dto';

@Controller('businesses')
export class BusinessesController {

  constructor(
    private businessesService: BusinessesService,
    private usersService: UsersService,
  ) {}

  @Post()
  async createBusiness(@Body('business') createBusinessDto: CreateBusinessDto, @Body('user') createUserDto: CreateUserDto): Promise<ReadBusinessDto|HttpException> {
    try {
      const foundBusiness = await this.businessesService.findBusinessByRuc(createBusinessDto.ruc);
      const foundUser = await this.usersService.findUserByEmail(createUserDto.email);
      if (foundBusiness) {
        throw new Error("Existe una empresa con el mismo N° de RUC");
      }
      if (foundUser) {
        throw new Error("Existe un usuario con el mismo email");
      }
      const business = await this.businessesService.create(createBusinessDto);
      createUserDto.businessId = business._id;
      await this.usersService.create(createUserDto);
      return business;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

