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
        component.seller = {
        name: "name",
        category: "",
        imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
        id: 7
    };
    component.onOk();
    fixture.detectChanges();
  });

  it('should create and submit the seller', () => {
    component.onOk();
    expect(component).toBeTruthy();
  });
    it('should create and then dissmiss', () => {
    component.onCancel();
    expect(component).toBeTruthy();
  });
});
