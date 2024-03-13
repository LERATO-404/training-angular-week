import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParcelsDetailsComponent } from './adm-parcels-details.component';

describe('AdmParcelsDetailsComponent', () => {
  let component: AdmParcelsDetailsComponent;
  let fixture: ComponentFixture<AdmParcelsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmParcelsDetailsComponent]
    });
    fixture = TestBed.createComponent(AdmParcelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
