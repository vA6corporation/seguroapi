import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Beneficiary, BeneficiaryDocument } from 'src/schemas/beneficiary.schema';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { ReadBeneficiaryDto } from './dto/read-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@Injectable()
export class BeneficiariesService {

  constructor(
    @InjectModel(Beneficiary.name) 
    private beneficiaryModel: Model<BeneficiaryDocument>
  ) { }

  async count(businessId: string): Promise<number> {
    return await this.beneficiaryModel.countDocuments({ businessId });
  }

  async findBeneficiariesByAny(key: string, businessId: string): Promise<ReadBeneficiaryDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundBeneficiaries = await this.beneficiaryModel.find({
      businessId,
      $or: [
        { name: regExp },
        { document: regExp },
      ]
    }).limit(20);
    if (foundBeneficiaries.length) {
      return foundBeneficiaries.map(beneficiary => plainToClass(ReadBeneficiaryDto, beneficiary));
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findBeneficiariesByPage(
    pageIndex: number, 
    pageSize: number, 
    businessId: string,
  ): Promise<ReadBeneficiaryDto[]> {
    const foundBeneficiaries = await this.beneficiaryModel.find({ businessId })
      .sort('-createdAt')
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundBeneficiaries.map(beneficiary => plainToClass(ReadBeneficiaryDto, beneficiary));
  }

  async findBeneficiaryById(beneficiaryId: string): Promise<ReadBeneficiaryDto> {
    const foundBeneficiary = await this.beneficiaryModel.findOne({ _id: beneficiaryId });
    if (foundBeneficiary) {
      return plainToClass(ReadBeneficiaryDto, foundBeneficiary.toObject());
    } else {
      throw new Error("Sin resultados");
    }
  }

  async create(
    createBeneficiaryDto: CreateBeneficiaryDto,
  ): Promise<ReadBeneficiaryDto> {
    const foundBeneficiary = await this.beneficiaryModel.findOne({ document: createBeneficiaryDto.document });
    if (foundBeneficiary) {
      throw new Error("Existe un beneficiario con este mismo N° de documento");
    }
    const createdBeneficiary = new this.beneficiaryModel(createBeneficiaryDto);
    const savedBeneficiary = await createdBeneficiary.save();
    return plainToClass(ReadBeneficiaryDto, savedBeneficiary.toObject());
  }

  async update(
    updateBeneficiaryDto: UpdateBeneficiaryDto,
    beneficiaryId: string,
  ): Promise<ReadBeneficiaryDto> {
    await this.beneficiaryModel.updateOne({ _id: beneficiaryId }, updateBeneficiaryDto);
    return plainToClass(ReadBeneficiaryDto, updateBeneficiaryDto);
  }

}
