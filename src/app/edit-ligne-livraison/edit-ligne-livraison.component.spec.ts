import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneLivraisonComponent } from './edit-ligne-livraison.component';

describe('EditLigneLivraisonComponent', () => {
  let component: EditLigneLivraisonComponent;
  let fixture: ComponentFixture<EditLigneLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLigneLivraisonComponent]
    });
    fixture = TestBed.createComponent(EditLigneLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
