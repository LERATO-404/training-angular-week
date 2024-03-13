import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPersonnelDetailsComponent } from './adm-personnel-details.component';

describe('AdmPersonnelDetailsComponent', () => {
  let component: AdmPersonnelDetailsComponent;
  let fixture: ComponentFixture<AdmPersonnelDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmPersonnelDetailsComponent]
    });
    fixture = TestBed.createComponent(AdmPersonnelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
