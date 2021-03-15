import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from 'src/schemas/material.schema';
import { CreateMaterialDto } from './dto/create-material.dto';
import { ReadMaterialDto } from './dto/read-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {

  constructor(
    @InjectModel(Material.name) 
    private materialModel: Model<MaterialDocument>
  ) { }

  async create(createMaterialDto: CreateMaterialDto): Promise<ReadMaterialDto> {
    const foundMaterial = await this.findMaterialByPolicyNumber(createMaterialDto.policyNumber);
    if (foundMaterial) {
      throw new Error("Existe un GAMF con este N° de poliza");
    }
    const createdMaterial = new this.materialModel(createMaterialDto);
    const savedMaterial = await createdMaterial.save();
    return plainToClass(ReadMaterialDto, savedMaterial.toObject());
  }

  async findMaterialsByAny(key: string, businessId: string): Promise<ReadMaterialDto[]> {
    const regExp = new RegExp(key, 'i');
    const foundMaterials = await this.materialModel.find({
      businessId,
      $or: [
        { policyNumber: regExp },
      ]
    }).populate(['customer', 'partnership'])
      .limit(20);
    if (foundMaterials.length) {
      return foundMaterials.map(material => plainToClass(ReadMaterialDto, material.toObject()));
    } else {
      throw new Error("Sin resultados");
    }
  }

  async findMaterialsByRangeEndDateByUser(startDate: string, endDate: string, businessId: string, userId: string): Promise<ReadMaterialDto[]> {
    const foundMaterials = await this.materialModel.find({
      businessId,
      userId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundMaterials.map(material => plainToClass(ReadMaterialDto, material.toObject()));
  }

  async findMaterialsByRangeEndDate(startDate: string, endDate: string, businessId: string): Promise<ReadMaterialDto[]> {
    const foundMaterials = await this.materialModel.find({
      businessId,
      endDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
    }).populate(['customer', 'partnership'])
    return foundMaterials.map(material => plainToClass(ReadMaterialDto, material.toObject()));
  }

  private async findMaterialByPolicyNumber(policyNumber: string): Promise<ReadMaterialDto|null> {
    const foundMaterial = await this.materialModel.findOne({ policyNumber });
    if (foundMaterial) {
      return plainToClass(ReadMaterialDto, foundMaterial);
    } else {
      return null;
    }
  }

  async update(updateMaterialDto: UpdateMaterialDto, materialId: string): Promise<ReadMaterialDto> {
    await this.materialModel.updateOne({ _id: materialId }, updateMaterialDto);
    return plainToClass(ReadMaterialDto, updateMaterialDto);
  }

  async count(businessId: string): Promise<number> {
    return this.materialModel.countDocuments({ businessId });
  }

  async findMaterialById(materialId: string): Promise<ReadMaterialDto> {
    const foundMaterial = await this.materialModel.findById(materialId)
    .populate(['customer', 'financier', 'beneficiary', 'partnership']);
    if (foundMaterial) {
      return plainToClass(ReadMaterialDto, foundMaterial.toObject());
    } else {
      throw new Error("Sin resultados");
    }
  }
  
  async findMaterialsByPage(pageIndex: number, pageSize: number, businessId: string): Promise<ReadMaterialDto[]> {
    const foundMaterials = await this.materialModel.find({ businessId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundMaterials.map(material => plainToClass(ReadMaterialDto, material.toObject()));
  }

  async findMaterialsByPageByUser(pageIndex: number, pageSize: number, businessId: string, userId: string): Promise<ReadMaterialDto[]> {
    const foundMaterials = await this.materialModel.find({ businessId, userId })
      .populate(['customer', 'partnership'])
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundMaterials.map(material => plainToClass(ReadMaterialDto, material.toObject()));
  }
}
