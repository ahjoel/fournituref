import { Component } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent {
  categories: Categorie[];
  message: string | null = null; 
  isError: boolean = false;
  isLoading = true;

  constructor(private categorieService: CategorieService, private router : Router,) {}

  ngOnInit(): void {
    this.chargerCategories();
  }


  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    setTimeout(() => {
      this.categorieService.listeCategorie().subscribe((cats) => {
        //console.log(cats);
        this.isLoading = false;
        this.categories = cats;
        setTimeout(() => {
          $('#dataTable').DataTable({
            paging: true, // Active la pagination
            pageLength: 10, // Nombre de lignes par page
          });
        }, 0); 
      });
    }, 5000);
  }

  chargerCategories() {
    setTimeout(() => {
      this.categorieService.listeCategorie().subscribe(
        (cats) => {
          this.isLoading = false;
          this.categories = cats;
        },
        (error) => {
          const errorMessage = error.error.message || 'Failed to load categories. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
    }, 5000);
  }

  supprimerCategorie(c: Categorie) {
    let conf = confirm('Etes-vous sûr de vouloire supprimer '+c.nomCat+ ' ? \nCette action est irréversible.');
    if (conf)
      this.categorieService.supprimerCategorie(c.id).subscribe(() => {
        //console.log('produit supprimé');
        this.chargerCategories();
        this.router.navigate(['/categorie']);
      });
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
