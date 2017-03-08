/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerDlgComponent } from './seller-dlg.component';

describe('SellerDlgComponent', () => {
  let component: SellerDlgComponent;
  let fixture: ComponentFixture<SellerDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
