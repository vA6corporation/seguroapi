import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { CreateMaterialDto } from './dto/create-material.dto';
import { ReadMaterialDto } from './dto/read-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';

@UseGuards(JwtAuthGuard)
@Controller('materials')
export class MaterialsController {

  constructor(
    private materialsService: MaterialsService,
  ) { }

  @Get('count')
  async getCount(@CurrentUser() user: User): Promise<number> {
    return await this.materialsService.count(user.businessId);
  }

  @Get('byAny/:key')
  async getMaterialsByAny(
    @Param('key') key: string,
    @CurrentUser() user: User,
  ): Promise<ReadMaterialDto[]> {
    try {
      return await this.materialsService.findMaterialsByAny(key, user.businessId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':pageIndex/:pageSize')
  async getMaterials(
    @Param('pageIndex') pageIndex: number, 
    @Param('pageSize') pageSize: number,
    @CurrentUser() user: User,
  ): Promise<ReadMaterialDto[]> {
    if (user.allGuaranties) {
      return await this.materialsService.findMaterialsByPage(pageIndex, pageSize, user.businessId);
    } else {
      return await this.materialsService.findMaterialsByPageByUser(pageIndex, pageSize, user.businessId, user._id);
    }
  }

  @Get(':materialId')
  async getMaterialById(
    @Param('materialId') materialId: string
  ) {
    try {
      return this.materialsService.findMaterialById(materialId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body('material') createMaterialDto: CreateMaterialDto): Promise<ReadMaterialDto> {
    try {
      return await this.materialsService.create(createMaterialDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':materialId')
  async update(
    @Body('material') updateMaterialDto: UpdateMaterialDto,
    @Param('materialId') materialId: string, 
  ): Promise<ReadMaterialDto> {
    return this.materialsService.update(updateMaterialDto, materialId);
  }
}
