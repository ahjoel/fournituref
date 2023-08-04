import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategorieComponent } from './editcategorie.component';

describe('EditcategorieComponent', () => {
  let component: EditcategorieComponent;
  let fixture: ComponentFixture<EditcategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcategorieComponent]
    });
    fixture = TestBed.createComponent(EditcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
