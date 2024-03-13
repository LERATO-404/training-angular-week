import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParcelsDeleteComponent } from './adm-parcels-delete.component';

describe('AdmParcelsDeleteComponent', () => {
  let component: AdmParcelsDeleteComponent;
  let fixture: ComponentFixture<AdmParcelsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmParcelsDeleteComponent]
    });
    fixture = TestBed.createComponent(AdmParcelsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
