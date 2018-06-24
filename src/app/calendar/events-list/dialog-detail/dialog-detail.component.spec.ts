import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog-detail.component';

describe('DialogComponentDetail', () => {
  let component: DialogComponentDetail;
  let fixture: ComponentFixture<DialogComponentDetail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponentDetail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
