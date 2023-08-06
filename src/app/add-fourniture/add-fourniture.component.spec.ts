import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournitureComponent } from './add-fourniture.component';

describe('AddFournitureComponent', () => {
  let component: AddFournitureComponent;
  let fixture: ComponentFixture<AddFournitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFournitureComponent]
    });
    fixture = TestBed.createComponent(AddFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
