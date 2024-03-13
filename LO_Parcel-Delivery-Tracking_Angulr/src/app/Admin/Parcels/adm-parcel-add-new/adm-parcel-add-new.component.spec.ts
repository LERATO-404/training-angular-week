import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParcelAddNewComponent } from './adm-parcel-add-new.component';

describe('AdmParcelAddNewComponent', () => {
  let component: AdmParcelAddNewComponent;
  let fixture: ComponentFixture<AdmParcelAddNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmParcelAddNewComponent]
    });
    fixture = TestBed.createComponent(AdmParcelAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
