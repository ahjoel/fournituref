import { Component } from '@angular/core';
import { Sortie } from '../model/sortie.model';
import { SortieService } from '../service/sortie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sortie',
  templateUrl: './list-sortie.component.html',
  styleUrls: ['./list-sortie.component.css']
})
export class ListSortieComponent {
  sorties: Sortie[];
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private sortieService: SortieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerSorties();
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    this.sortieService.listeSortie().subscribe((sors) => {
      this.sorties = sors;
      $('#dataTable').DataTable();
    });
  }

  supprimerSortie(s: Sortie) {
    let conf = confirm(
      'Etes-vous sûr de vouloire supprimer ' +
        s.codeSort +
        ' ? \nCette action est irréversible.'
    );
    if (conf)
      this.sortieService.supprimerSortie(s.id).subscribe(() => {
        this.chargerSorties();
        this.router.navigate(['/sortie']);
      });
  }

  chargerSorties() {
    this.sortieService.listeSortie().subscribe(
      (sorts) => {
        this.sorties = sorts;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Sortie Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
