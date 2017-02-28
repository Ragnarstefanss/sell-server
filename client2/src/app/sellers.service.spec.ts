/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService } from './sellers.service';

describe('SellersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellersService]
    });
  });

  it('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  }));
});
