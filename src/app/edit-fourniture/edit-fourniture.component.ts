import { Component } from '@angular/core';
import { Fourniture } from '../model/fourniture.model';
import { Categorie } from '../model/categorie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FournitureService } from '../service/fourniture.service';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-edit-fourniture',
  templateUrl: './edit-fourniture.component.html',
  styleUrls: ['./edit-fourniture.component.css'],
})
export class EditFournitureComponent {
  currentFourniture = new Fourniture();
  categories!: Categorie[];
  updatedCatId!: number;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fournitureService: FournitureService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieService.listeCategorie().subscribe((cats) => {
      this.categories = cats;
      //console.log(cats);
    });
    // this.currentFourniture.dateModification = new Date();
    this.fournitureService
      .consulterFourniture(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (four) => {
          this.currentFourniture = four;
          this.updatedCatId = this.currentFourniture.categorie.id;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Load Fourniture. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
  }

  updateFourniture() {
    this.currentFourniture.categorie = this.categories.find(
      (cat) => cat.id == this.updatedCatId
    )!;
    this.fournitureService.modifierFourniture(this.currentFourniture).subscribe(
      (four) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/fourniture/edit_fourniture']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
