import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceDetailsComponent } from './product-service-details.component';

describe('ProductServiceDetailsComponent', () => {
  let component: ProductServiceDetailsComponent;
  let fixture: ComponentFixture<ProductServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
