import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDialogFabComponent } from './home-dialog-fab.component';

describe('HomeDialogFabComponent', () => {
  let component: HomeDialogFabComponent;
  let fixture: ComponentFixture<HomeDialogFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDialogFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDialogFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
