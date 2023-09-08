import { Component } from '@angular/core';
import { Mouvement } from '../model/mouvement.model';
import { MouvementService } from '../service/mouvement.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list-mouvement.component.html',
  styleUrls: ['./list-mouvement.component.css'],
})
export class ListMouvementComponent {
  mouvements: Mouvement[];
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;
  qteNonLivre!: number;
  qteLivre!: number;
  qteFourLivraison!: number;
  qteFourSortie!: number;
  isLoading = true;

  constructor(
    private mouvementService: MouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerMouvement();
    this.mouvementService.quantiteCommandeNonLivree().subscribe(
      (res: any) => {
        this.qteNonLivre = res;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Commande Fournitures Non Livree. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );

    this.mouvementService.quantiteCommandeLivree().subscribe(
      (res: any) => {
        this.qteLivre = res;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Commande Fournitures Livree. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );

    this.mouvementService.quantiteFournitureLivraison().subscribe(
      (res: any) => {
        this.qteFourLivraison = res;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Fourniture Livraison. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );

    this.mouvementService.quantiteFournitureSortie().subscribe(
      (res: any) => {
        this.qteFourSortie = res;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Fourniture Sortie. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    setTimeout(() => {
      this.mouvementService.listeMouvement().subscribe((fours) => {
        this.isLoading = false;
        this.mouvements = fours;
        setTimeout(() => {
          $('#dataTable').DataTable({
            paging: true, // Active la pagination
            pageLength: 10, // Nombre de lignes par page
          });
        }, 0); 
      });
    }, 5000);
  }

  currentDate = new Date();
  day = this.currentDate.getDate().toString().padStart(2, '0');
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear().toString();
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
  date_code = `${this.day}${this.month}${this.year}${this.hours}${this.minutes}`;
  fileName = `ExcelSheetSituation${this.date_code}.xlsx`;

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('dataTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  chargerMouvement() {
    setTimeout(() => {
      this.mouvementService.listeMouvement().subscribe(
        (fours) => {
          this.isLoading = false;
          this.mouvements = fours;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to load Mouvement Fournitures. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
    }, 5000);
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
