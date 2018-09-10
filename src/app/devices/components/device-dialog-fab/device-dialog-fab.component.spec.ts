import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDialogFabComponent } from './device-dialog-fab.component';

describe('DeviceDialogFabComponent', () => {
  let component: DeviceDialogFabComponent;
  let fixture: ComponentFixture<DeviceDialogFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDialogFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDialogFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
