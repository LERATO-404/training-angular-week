import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeliveriesAddNewComponent } from './adm-deliveries-add-new.component';

describe('AdmDeliveriesAddNewComponent', () => {
  let component: AdmDeliveriesAddNewComponent;
  let fixture: ComponentFixture<AdmDeliveriesAddNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDeliveriesAddNewComponent]
    });
    fixture = TestBed.createComponent(AdmDeliveriesAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
