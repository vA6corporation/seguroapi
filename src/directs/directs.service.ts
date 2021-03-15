import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Direct, DirectDocument } from 'src/schemas/direct.schema';
import { CreateDirectDto } from './dto/create-direct.dto';
import { ReadDirectDto } from './dto/read-direct.dto';

@Injectable()
export class DirectsService {

  constructor(
    @InjectModel(Direct.name) 
    private directModel: Model<DirectDocument>
  ) { }

  async findDirectsByAny(key: string, businessId: string): Promise<ReadDirectDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundDirects = await this.directModel.find({
      businessId,
      $or: [
        { policyNumber: regExp },
      ]
    }).populate(['customer', 'partnership'])
      .limit(20);
    if (foundDirects.length) {
      return foundDirects.map(direct => plainToClass(ReadDirectDto, direct.toObject()));
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findDirectsByRangeEndDateByUser(startDate: string, endDate: string, businessId: string, userId: string): Promise<ReadDirectDto[]> {
    const foundDirects = await this.directModel.find({
      businessId,
      userId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundDirects.map(direct => plainToClass(ReadDirectDto, direct.toObject()));
  }

  async findDirectsByRangeEndDate(startDate: string, endDate: string, businessId: string): Promise<ReadDirectDto[]> {
    const foundDirects = await this.directModel.find({
      businessId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundDirects.map(direct => plainToClass(ReadDirectDto, direct.toObject()));
  }

  async create(createDirectDto: CreateDirectDto): Promise<ReadDirectDto> {
    const foundDirect = await this.findDirectByPolicyNumber(createDirectDto.policyNumber);
    if (foundDirect) {
      throw new Error("Existe un GADF con este N° de poliza");
    }
    const createdDirect = new this.directModel(createDirectDto);
    const savedDirect = await createdDirect.save();
    return plainToClass(ReadDirectDto, savedDirect.toObject());
  }

  private async findDirectByPolicyNumber(policyNumber: string): Promise<ReadDirectDto|null> {
    const foundDirect = await this.directModel.findOne({ policyNumber });
    if (foundDirect) {
      return plainToClass(ReadDirectDto, foundDirect.toObject());
    } else {
      return null;
    }
  }

  async update(direct: Direct, directId: string) {
    return await this.directModel.updateOne({ _id: directId }, direct);
  }

  async count(businessId: string): Promise<number> {
    return await this.directModel.countDocuments({ businessId });
  }

  async findDirectById(directId: string): Promise<ReadDirectDto> {
    const foundDirect = await this.directModel.findById(directId)
      .populate(['customer', 'financier', 'beneficiary', 'partnership']);
    if (foundDirect) {
      return plainToClass(ReadDirectDto, foundDirect.toObject());
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findDirectsByPage(pageIndex: number, pageSize: number, businessId: string): Promise<ReadDirectDto[]> {
    const foundDirects = await this.directModel.find({ businessId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundDirects.map(direct => plainToClass(ReadDirectDto, direct.toObject()));
  }

  async findDirectsByPageByUser(pageIndex: number, pageSize: number, businessId: string, userId: string): Promise<ReadDirectDto[]> {
    const foundDirects = await this.directModel.find({ businessId, userId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundDirects.map(direct => plainToClass(ReadDirectDto, direct.toObject()));
  }

}
