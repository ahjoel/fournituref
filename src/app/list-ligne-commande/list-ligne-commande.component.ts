import { Component } from '@angular/core';
import { Lignecommande } from '../model/lignecommande.model';
import { LignecommandeService } from '../service/lignecommande.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ligne-commande',
  templateUrl: './list-ligne-commande.component.html',
  styleUrls: ['./list-ligne-commande.component.css']
})
export class ListLigneCommandeComponent {
  lignecommandes: Lignecommande[];
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private ligneCommandeService: LignecommandeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerLigneCommandes();
    this.errorMessage = this.messageService.getErrorMessage();
  }

  //Initialisation des données avec Datatable
  ngAfterViewInit() {
    this.ligneCommandeService.listeLigneCommande().subscribe((lc) => {
      this.lignecommandes = lc;
      $('#dataTable').DataTable();
    });
  }

  supprimerLigneCommande(lc: Lignecommande) {
    let conf = confirm(
      'Etes-vous sûr de vouloire supprimer ' +
        lc.commande.codeCom +
        ' ? \nCette action est irréversible.'
    );
    if (conf)
      this.ligneCommandeService.supprimerLigneCommande(lc.id).subscribe(() => {
        this.chargerLigneCommandes();
        this.router.navigate(['/lignecommande']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Delete Commmande Fournitures. Commande liée.';
        this.showMessage(errorMessage, true);
      });
  }

  chargerLigneCommandes() {
    this.ligneCommandeService.listeLigneCommande().subscribe(
      (lc) => {
        this.lignecommandes = lc;
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to load Commmande Fournitures. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
