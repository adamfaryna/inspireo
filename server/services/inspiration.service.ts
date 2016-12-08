import * as fs from 'fs';
import { Inspiration } from '../models/inspiration.model';

export class InspirationService {
  constructor() {}

  private static instance: InspirationService;

  static getInstance() :InspirationService {
    if (!this.instance) {
      this.instance = new InspirationService();
    }
    return this.instance;
  }

  getRandom() {
    return new Promise( (resolve, reject) => {
      Inspiration.aggregate({ $sample: { size: 1 }}, (err, result) => {
        if (err) return reject(err);
        if (result.length === 0) return resolve({});
        return resolve(result[0]);
      });
    }).catch(console.log);
  }
}
