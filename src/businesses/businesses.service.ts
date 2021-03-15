import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from 'src/schemas/business.schema';
import { CreateBusinessDto } from './dto/create-business.dto';
import { ReadBusinessDto } from './dto/read-business.dto';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectModel(Business.name) 
    private businessModel: Model<BusinessDocument>
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<ReadBusinessDto> {
    const modelBusiness = new this.businessModel(createBusinessDto);
    const savedBusiness = await modelBusiness.save();
    return plainToClass(ReadBusinessDto, savedBusiness.toObject());
  }

  async findBusinessById(businessId: string): Promise<Business|null> {
    return this.businessModel.findOne({ _id: businessId });
  }

  async findBusinessByDocument(document: string): Promise<Business|null> {
    return this.businessModel.findOne({ document });
  }

  async findAll(): Promise<Business[]> {
    return this.businessModel.find();
  }
}
