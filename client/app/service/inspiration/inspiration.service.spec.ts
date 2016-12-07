/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspirationService } from './inspiration.service';

describe('InspirationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspirationService]
    });
  });

  it('should ...', inject([InspirationService], (service: InspirationService) => {
    expect(service).toBeTruthy();
  }));
});
