import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { MaterialsService } from 'src/materials/materials.service';
import { MailsService } from './mails.service';
import { Response } from 'express';
import { DirectsService } from 'src/directs/directs.service';
import { CompliancesService } from 'src/compliances/compliances.service';

@Controller('mails')
export class MailsController {

  constructor(
    private mailsService: MailsService,
    private materialsService: MaterialsService,
    private directsService: DirectsService,
    private compliancesService: CompliancesService,
  ) { }
  
  @Get(':materialId/mailMaterial')
  async sendEmailMaterial(
    @Param('materialId') materialId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const foundMaterial = await this.materialsService.findMaterialById(materialId);
      const html = await this.mailsService.sendMail(foundMaterial, res);
      // return res.send(html)
      return res.send(foundMaterial);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':complianceId/mailCompliance')
  async sendEmailCompliance(
    @Param('complianceId') complianceId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const foundCompliance = await this.compliancesService.findComplianceById(complianceId);
      await this.mailsService.sendMail(foundCompliance, res);
      return res.send(foundCompliance);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':directId/mailDirect')
  async sendEmailDirect(
    @Param('directId') directId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const foundDirect = await this.directsService.findDirectById(directId);
      console.log(foundDirect);
      
      await this.mailsService.sendMail(foundDirect, res);
      return res.send(foundDirect);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // @Get('daily')
  // async sendEmailDaily(
  //   @Param('materialId') materialId: string,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   try {
  //     const foundMaterial = await this.materialsService.findMaterialById(materialId);
  //     await this.mailsService.sendMail(foundMaterial, res);
  //     return res.send(foundMaterial);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //   }
  // }
}
