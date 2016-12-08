const request = require('request');
import { User } from '../models/user.model';

export class Text {
  constructor(public toNumber: string, public content: string) {}
}

export class TextService {
  constructor() {}

  static instance: TextService;

  static getInstance(): TextService {
    if (!this.instance) {
      this.instance = new TextService();
    }
    return this.instance;
  }

  sendText(text: Text) {
    return new Promise( (resolve, reject) => {
      const serviceUrl =
        `${process.env.PURETEXT_HOST || process.env.TEXT_PROVIDER_HOST}/service/sms/send?` +
         `fromNumber=${process.env.TEXT_FROM_NUMBER || process.env.PURETEXT_FROM_NUMBER}` +
         `&apiToken=${process.env.PURETEXT_API_TOKEN || process.env.PURETEXT_API_TOKEN}` +
         `&toNumber=${text.toNumber}` +
         `&smsBody=${encodeURIComponent(text.content.slice(0, 99))}`;
         console.log('serviceUrl: ' + serviceUrl);

      request(serviceUrl)
        .on('error', console.log)
        .on('response', resolve);
    }).catch(console.log);
  }
}
