import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFournitureComponent } from './edit-fourniture.component';

describe('EditFournitureComponent', () => {
  let component: EditFournitureComponent;
  let fixture: ComponentFixture<EditFournitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFournitureComponent]
    });
    fixture = TestBed.createComponent(EditFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
