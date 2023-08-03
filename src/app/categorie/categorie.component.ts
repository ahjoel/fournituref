import { Component } from '@angular/core';
declare var $: any; 
import 'datatables.net';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {

  ngAfterViewInit() {
    $('#dataTable').DataTable();
  }
}
