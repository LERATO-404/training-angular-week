import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParcelsListComponent } from './adm-parcels-list.component';

describe('AdmParcelsListComponent', () => {
  let component: AdmParcelsListComponent;
  let fixture: ComponentFixture<AdmParcelsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmParcelsListComponent]
    });
    fixture = TestBed.createComponent(AdmParcelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
