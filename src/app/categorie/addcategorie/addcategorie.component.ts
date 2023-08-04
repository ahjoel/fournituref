import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.css'],
})
export class AddcategorieComponent {
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
