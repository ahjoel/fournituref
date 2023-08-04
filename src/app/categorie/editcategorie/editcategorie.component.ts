import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-editcategorie',
  templateUrl: './editcategorie.component.html',
  styleUrls: ['./editcategorie.component.css'],
})
export class EditcategorieComponent implements OnInit {
  currentCategorie = new Categorie();
  categories!: Categorie[];
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.categorieService
      .consulterCategorie(this.activatedRoute.snapshot.params['id'])
      .subscribe((cat) => {
        this.currentCategorie = cat;
      });
  }

  updateCategorie() {
    this.categorieService.modifierCategorie(this.currentCategorie).subscribe(
      (cat) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/categorie/edit_categorie']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit category. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
