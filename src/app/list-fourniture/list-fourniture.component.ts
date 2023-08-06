import { Component } from '@angular/core';
import { Fourniture } from '../model/fourniture.model';
import { Router } from '@angular/router';
import { FournitureService } from '../service/fourniture.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-list-fourniture',
  templateUrl: './list-fourniture.component.html',
  styleUrls: ['./list-fourniture.component.css'],
})
export class ListFournitureComponent {
  fournitures: Fourniture[];
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private fournitureService: FournitureService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerFournitures();
    this.errorMessage = this.messageService.getErrorMessage();
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    this.fournitureService.listeFourniture().subscribe((fours) => {
      this.fournitures = fours;
      $('#dataTable').DataTable();
    });
  }

  supprimerFourniture(f: Fourniture) {
    let conf = confirm(
      'Etes-vous sûr de vouloire supprimer ' +
        f.nomFour +
        ' ? \nCette action est irréversible.'
    );
    if (conf)
      this.fournitureService.supprimerFourniture(f.id).subscribe(() => {
        this.chargerFournitures();
        this.router.navigate(['/fourniture']);
      });
  }

  chargerFournitures() {
    this.fournitureService.listeFourniture().subscribe(
      (fours) => {
        this.fournitures = fours;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Fournitures. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
