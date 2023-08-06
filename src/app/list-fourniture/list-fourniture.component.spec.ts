import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFournitureComponent } from './list-fourniture.component';

describe('ListFournitureComponent', () => {
  let component: ListFournitureComponent;
  let fixture: ComponentFixture<ListFournitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFournitureComponent]
    });
    fixture = TestBed.createComponent(ListFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
