import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPersonnelListComponent } from './adm-personnel-list.component';

describe('AdmPersonnelListComponent', () => {
  let component: AdmPersonnelListComponent;
  let fixture: ComponentFixture<AdmPersonnelListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmPersonnelListComponent]
    });
    fixture = TestBed.createComponent(AdmPersonnelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
