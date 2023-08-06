import { Component } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  newCategorie = new Categorie();
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  addCategorie() {
    this.categorieService.ajouterCategorie(this.newCategorie).subscribe(
      (cat) => {
        this.showMessage(
          'Catégorie ' + this.newCategorie.nomCat + ' crée avec succès!',
          false
        );
        this.newCategorie = new Categorie();
        this.router.navigate(['/categorie/add_categorie']);
      },
      (error) => {
        const errorMessage = error.error.message || 'Unknown error occurred.';
        this.showMessage(errorMessage, true);
        //console.log('error' + error);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }

}
