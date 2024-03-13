import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeliveriesDeleteComponent } from './adm-deliveries-delete.component';

describe('AdmDeliveriesDeleteComponent', () => {
  let component: AdmDeliveriesDeleteComponent;
  let fixture: ComponentFixture<AdmDeliveriesDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDeliveriesDeleteComponent]
    });
    fixture = TestBed.createComponent(AdmDeliveriesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
