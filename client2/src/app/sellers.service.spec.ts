/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { FormsModule } from "@angular/forms";
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('SellersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellersService,Http],imports: [FormsModule]
    });
  });

  it('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  }));
});
