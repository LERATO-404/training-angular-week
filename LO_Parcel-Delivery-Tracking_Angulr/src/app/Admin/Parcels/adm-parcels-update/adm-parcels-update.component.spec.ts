import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParcelsUpdateComponent } from './adm-parcels-update.component';

describe('AdmParcelsUpdateComponent', () => {
  let component: AdmParcelsUpdateComponent;
  let fixture: ComponentFixture<AdmParcelsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmParcelsUpdateComponent]
    });
    fixture = TestBed.createComponent(AdmParcelsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
