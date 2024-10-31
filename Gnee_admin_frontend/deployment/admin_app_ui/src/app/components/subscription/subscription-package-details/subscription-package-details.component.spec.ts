import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageDetailsComponent } from './subscription-package-details.component';

describe('SubscriptionPackageDetailsComponent', () => {
  let component: SubscriptionPackageDetailsComponent;
  let fixture: ComponentFixture<SubscriptionPackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
