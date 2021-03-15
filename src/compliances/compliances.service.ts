import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Compliance, ComplianceDocument } from 'src/schemas/compliance.schema';
import { CreateComplianceDto } from './dto/create-compliance.dto';
import { ReadComplianceDto } from './dto/read-compliance.dto';
import { UpdateComplianceDto } from './dto/update-compliance.dto';

@Injectable()
export class CompliancesService {

  constructor(
    @InjectModel(Compliance.name) 
    private complianceModel: Model<ComplianceDocument>
  ) { }

  async count(businessId: string) {
    return this.complianceModel.countDocuments({ businessId });
  }

  async findComplianceById(complianceId: string): Promise<ReadComplianceDto> {
    const foundCompliance = await this.complianceModel.findById(complianceId)
      .populate(['customer', 'financier', 'beneficiary', 'partnership']);
    if (foundCompliance) {
      return plainToClass(ReadComplianceDto, foundCompliance.toObject());
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findCompliancesByAny(key: string, businessId: string): Promise<ReadComplianceDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundCompliances = await this.complianceModel.find({
      businessId,
      $or: [
        { policyNumber: regExp },
      ]
    }).populate(['customer', 'partnership'])
      .limit(20);
    if (foundCompliances.length) {
      return foundCompliances.map(compliance => plainToClass(ReadComplianceDto, compliance.toObject()));
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findCompliancesByRangeEndDateByUser(startDate: string, endDate: string, businessId: string, userId: string): Promise<ReadComplianceDto[]> {
    const foundDirects = await this.complianceModel.find({
      businessId,
      userId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundDirects.map(compliance => plainToClass(ReadComplianceDto, compliance.toObject()));
  }

  async findCompliancesByRangeEndDate(startDate: string, endDate: string, businessId: string): Promise<ReadComplianceDto[]> {
    const foundDirects = await this.complianceModel.find({
      businessId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundDirects.map(compliance => plainToClass(ReadComplianceDto, compliance.toObject()));
  }

  async findComplianceByPage(pageIndex: number, pageSize: number, businessId: string): Promise<ReadComplianceDto[]> {
    const foundCompliances = await this.complianceModel.find({ businessId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundCompliances.map(compliance => plainToClass(ReadComplianceDto, compliance.toObject()));
  }

  async findComplianceByPageByUser(pageIndex: number, pageSize: number, businessId: string, userId: string): Promise<ReadComplianceDto[]> {
    const foundCompliances = await this.complianceModel.find({ businessId, userId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundCompliances.map(compliance => plainToClass(ReadComplianceDto, compliance.toObject()));
  }

  async create(createComplianceDto: CreateComplianceDto): Promise<ReadComplianceDto> {
    const foundCompliance = await this.findComplianceByPolicyNumber(createComplianceDto.policyNumber);
    if (foundCompliance) {
      throw new Error("Existe un GFCF con este N° de poliza");
    }
    const createdCompliance = new this.complianceModel(createComplianceDto);
    const savedCompliance = await createdCompliance.save();
    return plainToClass(ReadComplianceDto, savedCompliance.toObject());
  }

  private async findComplianceByPolicyNumber(policyNumber: string): Promise<ReadComplianceDto|null> {
    const foundCompliance = await this.complianceModel.findOne({ policyNumber });
    if (foundCompliance) {
      return plainToClass(ReadComplianceDto, foundCompliance);
    } else {
      return null;
    }
  }

  async update(updateComplianceDto: UpdateComplianceDto, complianceId: string): Promise<ReadComplianceDto> {
    await this.complianceModel.updateOne({ _id: complianceId }, updateComplianceDto);
    return plainToClass(ReadComplianceDto, updateComplianceDto);
  }

}
