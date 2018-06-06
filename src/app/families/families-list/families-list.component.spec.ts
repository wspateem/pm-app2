import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesListComponent } from './families-list.component';

describe('FamiliesListComponent', () => {
  let component: FamiliesListComponent;
  let fixture: ComponentFixture<FamiliesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
