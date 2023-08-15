import { Component } from '@angular/core';
import { LignelivraisonService } from '../service/lignelivraison.service';
import { MouvementService } from '../service/mouvement.service';
import { LignecommandeService } from '../service/lignecommande.service';
import { Router } from '@angular/router';
import { Lignecommande } from '../model/lignecommande.model';
import { Mouvement } from '../model/mouvement.model';
import { Lignelivraison } from '../model/lignelivraison.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-etat-livraison',
  templateUrl: './etat-livraison.component.html',
  styleUrls: ['./etat-livraison.component.css'],
})
export class EtatLivraisonComponent {
  lignelivraisons: Lignelivraison[];
  mouvement = new Mouvement();
  lignecommande: Lignecommande;
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private ligneLivraisonService: LignelivraisonService,
    private mouvementService: MouvementService,
    private lignecommandeService: LignecommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerLigneLivraison();
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    this.ligneLivraisonService.listeLigneLivraison().subscribe((lv) => {
      this.lignelivraisons = lv;
      $('#dataTable').DataTable();
    });
  }

  currentDate = new Date();
  day = this.currentDate.getDate().toString().padStart(2, '0');
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear().toString();
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
  date_code = `${this.day}${this.month}${this.year}${this.hours}${this.minutes}`;
  fileName = `ExcelSheetLivraison${this.date_code}.xlsx`;

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

  chargerLigneLivraison() {
    this.ligneLivraisonService.listeLigneLivraison().subscribe(
      (lv) => {
        this.lignelivraisons = lv;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Livraison Fournitures. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
