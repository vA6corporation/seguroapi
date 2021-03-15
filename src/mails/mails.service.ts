import { Injectable } from '@nestjs/common';
import { Response } from 'express';
const path = require('path');

@Injectable()
export class MailsService {

  private readonly API_KEY = process.env.API_KEY;                                  
  private readonly DOMAIN = process.env.DOMAIN;
  private readonly FROM = process.env.FROM;
  private readonly FILEPATH = path.join('./Formato.pdf');

  sendMail(
    compliance: any,
    res: Response,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const { customer } = compliance;
      res.render('mail', compliance, async (error, html) => {
        // return resolve(html);
        if (error) {
          return reject(error);
        }
        const mailgun = require('mailgun-js');
        const mg = mailgun({ 
          apiKey: this.API_KEY,
          domain: this.DOMAIN,
        });
        const subject = 'Renovacion de fianza';
        const data = { 
          from: this.FROM, 
          to: customer.email, 
          subject, 
          html,
          attachment: this.FILEPATH,
        };
        mg.messages().send(data, (error: any, body: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
  
}
