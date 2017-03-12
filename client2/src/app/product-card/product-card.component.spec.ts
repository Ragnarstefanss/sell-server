/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent],imports: [FormsModule],providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      name: "name",
      price: 0,
      quantityInStock: 0,
      quantitySold: 100,
      imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
      id: 7
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
