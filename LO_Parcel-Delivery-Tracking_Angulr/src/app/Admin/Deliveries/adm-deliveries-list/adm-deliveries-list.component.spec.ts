import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeliveriesListComponent } from './adm-deliveries-list.component';

describe('AdmDeliveriesListComponent', () => {
  let component: AdmDeliveriesListComponent;
  let fixture: ComponentFixture<AdmDeliveriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDeliveriesListComponent]
    });
    fixture = TestBed.createComponent(AdmDeliveriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
