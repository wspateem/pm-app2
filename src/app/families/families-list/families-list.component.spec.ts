import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesListComponent } from './families-list.component';
<<<<<<< HEAD

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
=======
describe('Component: Families', () => {
  it('should create an instance', () => {
    let component = new FamiliesListComponent();
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
    expect(component).toBeTruthy();
  });
});
