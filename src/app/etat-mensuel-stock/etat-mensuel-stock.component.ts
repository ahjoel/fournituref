import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MouvementService } from '../service/mouvement.service';

@Component({
  selector: 'app-etat-mensuel-stock',
  templateUrl: './etat-mensuel-stock.component.html',
  styleUrls: ['./etat-mensuel-stock.component.css']
})
export class EtatMensuelStockComponent {
  // lignelivraisons: Lignelivraison[];
  // mouvement = new Mouvement();
  data: any[] = [];
  datedeb:Date|any;
  datefin:Date|any;
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    // private ligneLivraisonService: LignelivraisonService,
    private mouvementService: MouvementService,
    // private lignecommandeService: LignecommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    this.mouvementService.getSituationPeriodeStock(this.datedeb, this.datefin).subscribe((lv) => {
      this.data = lv;
      $('#dataTable').DataTable();
    },(error) => {
      const errorMessage =
        error.error.message ||
        'Failed to load Situation. Please try again later.';
      // this.showMessage(errorMessage, true);
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

  chargerSituation() {
    this.mouvementService.getSituationPeriodeStock(this.datedeb, this.datefin).subscribe((lv) => {
      this.data = lv;
      // console.log("test "+this.data)
    },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Situation. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
