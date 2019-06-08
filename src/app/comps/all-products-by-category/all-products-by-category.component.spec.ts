import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsByCategoryComponent } from './all-products-by-category.component';

describe('AllProductsByCategoryComponent', () => {
  let component: AllProductsByCategoryComponent;
  let fixture: ComponentFixture<AllProductsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
