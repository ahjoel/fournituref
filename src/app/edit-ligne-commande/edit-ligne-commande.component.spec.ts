import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneCommandeComponent } from './edit-ligne-commande.component';

describe('EditLigneCommandeComponent', () => {
  let component: EditLigneCommandeComponent;
  let fixture: ComponentFixture<EditLigneCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLigneCommandeComponent]
    });
    fixture = TestBed.createComponent(EditLigneCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
