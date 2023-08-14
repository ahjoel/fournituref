import { Component } from '@angular/core';
import { Fourniture } from '../model/fourniture.model';
import { Categorie } from '../model/categorie.model';
import { FournitureService } from '../service/fourniture.service';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-add-fourniture',
  templateUrl: './add-fourniture.component.html',
  styleUrls: ['./add-fourniture.component.css'],
})
export class AddFournitureComponent {
  newFourniture = new Fourniture();
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private fournitureService: FournitureService,
    private categorieService: CategorieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categorieService.listeCategorie().subscribe((cats) => {
      this.categories = cats;
    });
    // this.newFourniture.dateCreation = new Date();
    // this.newFourniture.dateModification = new Date();
    this.newFourniture.etatFour = "ACTIVE";
  }

  addFourniture() {

    this.newFourniture.categorie = this.categories.find(
      (cat) => cat.id == this.newIdCat
    )!;
    
    this.fournitureService.ajouterFourniture(this.newFourniture).subscribe(
      () => {
        this.showMessage(
          'Fourniture ' + this.newFourniture.nomFour + ' crée avec succès !',
          false
        );
        this.newFourniture = new Fourniture();
        this.newFourniture.mesureFour = null;
        this.newIdCat = null;
        this.router.navigate(['/fourniture/add_fourniture']);
      },
      (error) => {
        const errorMessage = 
          error.error.message ||
          'Failed to save Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
        // this.messageService.setErrorMessage(errorMessage);
        // this.router.navigate(['/fourniture']);
      }
    );

  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }

}
