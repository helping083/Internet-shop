import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersSideNavComponent } from './filters-side-nav.component';

describe('FiltersSideNavComponent', () => {
  let component: FiltersSideNavComponent;
  let fixture: ComponentFixture<FiltersSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
