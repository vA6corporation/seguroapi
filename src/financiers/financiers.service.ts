import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Financier, FinancierDocument } from 'src/schemas/financier.schema';
import { CreateFinancierDto } from './dto/create-financier.dto';
import { ReadFinancierDto } from './dto/read-financier.dto';
import { UpdateFinancierDto } from './dto/update-financier.dto';

@Injectable()
export class FinanciersService {
  
  constructor(
    @InjectModel(Financier.name) 
    private financierModel: Model<FinancierDocument>
  ) { }

  async create(createFinancierDto: CreateFinancierDto): Promise<ReadFinancierDto> {
    const foundFinancier = await this.findFinancierByDocument(createFinancierDto.document);
    if (foundFinancier) {
      throw new Error("Existe una financiera con el mismo N° de documento");
    } else {
      const createdFinancier = new this.financierModel(createFinancierDto);
      const savedFinancier = await createdFinancier.save();
      return plainToClass(ReadFinancierDto, savedFinancier.toObject());
    }
  }

  async update(updateFinancierDto: UpdateFinancierDto, financierId: string): Promise<ReadFinancierDto> {
    const foundFinancier = await this.findFinancierByDocument(updateFinancierDto.document);
    if (foundFinancier && !foundFinancier._id.equals(financierId)) {
      throw new Error("Existe una financiera con el mismo N° de documento");
    }
    await this.financierModel.updateOne({ _id: financierId }, updateFinancierDto);
    return plainToClass(ReadFinancierDto, updateFinancierDto);
  }

  async count(businessId: string): Promise<number> {
    return this.financierModel.countDocuments({ businessId });
  }


  async findFinancierById(financierId: string): Promise<ReadFinancierDto|null> {
    const foundFinancier = await this.financierModel.findOne({ _id: financierId });
    if (foundFinancier) {
      return plainToClass(ReadFinancierDto, foundFinancier);
    } else {
      return null;
    }
  }

  async findFinancierByDocument(document: string): Promise<ReadFinancierDto|null> {
    const foundFinancier = await this.financierModel.findOne({ document });
    if (foundFinancier) {
      return plainToClass(ReadFinancierDto, foundFinancier);
    } else {
      return null;
    }
  }

  async findFinanciersByPage(pageIndex: number, pageSize: number, businessId: string): Promise<ReadFinancierDto[]> {
    const foundFinanciers = await this.financierModel.find({ businessId })
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundFinanciers.map(financier => plainToClass(ReadFinancierDto, financier));
  }

  async findFinanciersByAny(key: string, businessId: string): Promise<ReadFinancierDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundFinanciers = await this.financierModel.find({ 
      businessId,
      $or: [
        { name: regExp },
        { document: regExp },
      ] 
    }).limit(20);
    if (foundFinanciers.length) {
      return foundFinanciers.map(financier => plainToClass(ReadFinancierDto, financier));
    } else {
      throw new Error("Sin resultados");
    }
  }
}
