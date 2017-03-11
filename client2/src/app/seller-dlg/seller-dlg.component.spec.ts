/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { SellerDlgComponent } from './seller-dlg.component';

describe('SellerDlgComponent', () => {
  let component: SellerDlgComponent;
  let fixture: ComponentFixture<SellerDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDlgComponent ],imports: [FormsModule],providers: [NgbActiveModal]
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
