import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Partnership, PartnershipDocument } from 'src/schemas/partnership.schema';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { ReadPartnershipDto } from './dto/read-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';

@Injectable()
export class PartnershipsService {

  constructor(
    @InjectModel(Partnership.name) 
    private partnershipModel: Model<PartnershipDocument>
  ) { }

  async count(businessId: string): Promise<number> {
    return await this.partnershipModel.countDocuments({ businessId });
  }

  async getPartnershipById(partnershipId: string): Promise<ReadPartnershipDto> {
    const foundPartnership = await this.partnershipModel.findById(partnershipId)
      .populate(['customers']);
    if (foundPartnership) {
      return plainToClass(ReadPartnershipDto, foundPartnership.toObject());
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findPartnershipsByAny(key: string, businessId: string): Promise<ReadPartnershipDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundPartnerships = await this.partnershipModel.find({
      businessId,
      $or: [
        { name: regExp },
        { document: regExp },
      ]
    }).limit(20);
    if (foundPartnerships.length) {
      return foundPartnerships.map(partnership => plainToClass(ReadPartnershipDto, partnership));
    } else {
      throw new Error("Sin resultados");
    }
  }

  async getPartnershipsByPage(
    pageIndex: number, 
    pageSize: number, 
    businessId: string
  ): Promise<Partnership[]> {
    const foundPartnerships = await this.partnershipModel.find({ businessId })
      .sort('-createdAt')
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundPartnerships.map(partnership => plainToClass(ReadPartnershipDto, partnership.toObject()));
  }

  async create(createPartnershipDto: CreatePartnershipDto): Promise<ReadPartnershipDto> {
    const foundPartnership = await this.partnershipModel.findOne({ document: createPartnershipDto.document });
    if (foundPartnership) {
      throw new Error("Existe un consorcio con este mismo N° de documento");
    }
    const createdPartnership = new this.partnershipModel(createPartnershipDto);
    const savedPartnership = await createdPartnership.save();
    return plainToClass(ReadPartnershipDto, savedPartnership.toObject());
  }

  async update(
    updatePartnershipDto: UpdatePartnershipDto, 
    partnershipId: string
  ): Promise<ReadPartnershipDto> {
    await this.partnershipModel.updateOne({ _id: partnershipId }, updatePartnershipDto);
    return plainToClass(ReadPartnershipDto, updatePartnershipDto);
  }
  
}
