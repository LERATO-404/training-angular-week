import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeliveriesUpdateComponent } from './adm-deliveries-update.component';

describe('AdmDeliveriesUpdateComponent', () => {
  let component: AdmDeliveriesUpdateComponent;
  let fixture: ComponentFixture<AdmDeliveriesUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDeliveriesUpdateComponent]
    });
    fixture = TestBed.createComponent(AdmDeliveriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
