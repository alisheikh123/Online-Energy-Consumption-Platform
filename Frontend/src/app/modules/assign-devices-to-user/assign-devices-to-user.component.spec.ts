import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDevicesToUserComponent } from './assign-devices-to-user.component';

describe('AssignDevicesToUserComponent', () => {
  let component: AssignDevicesToUserComponent;
  let fixture: ComponentFixture<AssignDevicesToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDevicesToUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDevicesToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
