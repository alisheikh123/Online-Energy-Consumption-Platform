import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDevicesListComponent } from './view-devices-list.component';

describe('ViewDevicesListComponent', () => {
  let component: ViewDevicesListComponent;
  let fixture: ComponentFixture<ViewDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDevicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
