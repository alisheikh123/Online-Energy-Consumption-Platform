import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnergyConsuptionHoursComponent } from './add-energy-consuption-hours.component';

describe('AddEnergyConsuptionHoursComponent', () => {
  let component: AddEnergyConsuptionHoursComponent;
  let fixture: ComponentFixture<AddEnergyConsuptionHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnergyConsuptionHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnergyConsuptionHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
