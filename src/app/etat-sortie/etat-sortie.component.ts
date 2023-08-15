import { Component } from '@angular/core';
import { SortieService } from '../service/sortie.service';
import { MouvementService } from '../service/mouvement.service';
import { Router } from '@angular/router';
import { Sortie } from '../model/sortie.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-etat-sortie',
  templateUrl: './etat-sortie.component.html',
  styleUrls: ['./etat-sortie.component.css'],
})
export class EtatSortieComponent {
  sorties: Sortie[];
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private sortieService: SortieService,
    private mouvementService: MouvementService,
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

  currentDate = new Date();
  day = this.currentDate.getDate().toString().padStart(2, '0');
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear().toString();
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
  date_code = `${this.day}${this.month}${this.year}${this.hours}${this.minutes}`;
  fileName = `ExcelSheetSortie${this.date_code}.xlsx`;

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
