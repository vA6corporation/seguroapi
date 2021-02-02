import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReadCustomerDto } from './dto/read-customer.dto';
import { plainToClass } from 'class-transformer';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  
  constructor(
    @InjectModel(Customer.name) 
    private customerModel: Model<CustomerDocument>
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<ReadCustomerDto> {
    const foundCustomer = await this.findCustomerByDocument(createCustomerDto.document, createCustomerDto.typeDocument);
    if (foundCustomer) {
      throw new Error("Existe un cliente con el mismo N° de Documento");
    } else {
      const customer = new this.customerModel(createCustomerDto);
      await customer.save();
      return plainToClass(ReadCustomerDto, customer.toObject());
    }
  }

  async update(updateCustomerDto: UpdateCustomerDto, customerId: string): Promise<ReadCustomerDto> {
    const foundCustomer = await this.findCustomerByDocument(updateCustomerDto.document, updateCustomerDto.typeDocument);
    if (foundCustomer && !foundCustomer._id.equals(customerId)) {
      throw new Error("Existe un cliente con el mismo N° de Documento");
    } else {
      await this.customerModel.updateOne({ _id: customerId }, updateCustomerDto);
      return plainToClass(ReadCustomerDto, updateCustomerDto);
    }
  }

  async count(businessId: string): Promise<number> {
    return this.customerModel.countDocuments({ businessId });
  }

  async findCustomerById(customerId: string): Promise<ReadCustomerDto|null> {
    const foundCustomer = await this.customerModel.findOne({ _id: customerId });
    if (foundCustomer) {
      return plainToClass(ReadCustomerDto, foundCustomer.toObject());
    } else {
      return null;      
    }
  }

  async findCustomerByDocument(document: string, typeDocument: string): Promise<ReadCustomerDto|null> {
    const foundCustomer = await this.customerModel.findOne({ document, typeDocument });
    if (foundCustomer) {
      return plainToClass(ReadCustomerDto, foundCustomer.toObject());
    } else {
      return null;
    }
  }

  async findCustomersByPage(pageIndex: number, pageSize: number, businessId: string): Promise<ReadCustomerDto[]> {
    const foundCustomers = await this.customerModel.find({ businessId })
      .skip((pageSize * pageIndex) - pageSize)
      .limit(pageSize);
    return foundCustomers.map(customer => plainToClass(ReadCustomerDto, customer.toObject()));
  }
}

