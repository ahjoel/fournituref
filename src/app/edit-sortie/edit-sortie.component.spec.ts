import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSortieComponent } from './edit-sortie.component';

describe('EditSortieComponent', () => {
  let component: EditSortieComponent;
  let fixture: ComponentFixture<EditSortieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSortieComponent]
    });
    fixture = TestBed.createComponent(EditSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
