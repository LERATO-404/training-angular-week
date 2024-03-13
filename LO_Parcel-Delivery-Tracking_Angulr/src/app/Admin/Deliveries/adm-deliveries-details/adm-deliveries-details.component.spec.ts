import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeliveriesDetailsComponent } from './adm-deliveries-details.component';

describe('AdmDeliveriesDetailsComponent', () => {
  let component: AdmDeliveriesDetailsComponent;
  let fixture: ComponentFixture<AdmDeliveriesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDeliveriesDetailsComponent]
    });
    fixture = TestBed.createComponent(AdmDeliveriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
