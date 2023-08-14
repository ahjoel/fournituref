import { Component } from '@angular/core';
import { Lignelivraison } from '../model/lignelivraison.model';
import { LignelivraisonService } from '../service/lignelivraison.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';
import { LignecommandeService } from '../service/lignecommande.service';
import { Lignecommande } from '../model/lignecommande.model';

@Component({
  selector: 'app-list-ligne-livraison',
  templateUrl: './list-ligne-livraison.component.html',
  styleUrls: ['./list-ligne-livraison.component.css'],
})
export class ListLigneLivraisonComponent {
  lignelivraisons: Lignelivraison[];
  lignecommande: Lignecommande;
  message: string | null = null;
  errorMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private ligneLivraisonService: LignelivraisonService,
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

  supprimerLigneLivraison(lv: Lignelivraison) {
    let conf = confirm(
      'Etes-vous sûr de vouloire supprimer ' +
        lv.livraison.codeLiv +
        ' ? \nCette action est irréversible.'
    );
    if (conf)
      this.ligneLivraisonService
        .supprimerLigneLivraison(lv.id)
        .subscribe(() => {
          this.chargerLigneLivraison();
          this.router.navigate(['/lignelivraison']);
        });
  }

  validerLigneLivraison(lv: Lignelivraison) {
    let conf = confirm(
      'Voudriez-vous valider la livraison ' +
        lv.livraison.codeLiv +
        ' ' +
        lv.fourniture.nomFour +
        ' ' +
        lv.fourniture.mesureFour +
        ' ? \nCette action est irréversible. \nElle entrainera un changement de statut en "LIVREE" de la commande associée.'
    );
    if (conf) {
      lv.etatLivraison = 'VA';
      // this.lignecommande.etatLigneCom
      this.ligneLivraisonService.modifierLigneLivraison(lv).subscribe(
        () => {
          this.lignecommandeService
            .updateLigneCommandeEtatToLivree(lv.lignecommande.id)
            .subscribe(
              () => {},
              (error) => {
                const errorMessage =
                  error.error.message ||
                  'Failed to Validate Commande Fourniture. Please try again later.';
                this.showMessage(errorMessage, true);
              }
            );
          this.showMessage('Modification effectuée!', false);
          this.chargerLigneLivraison();
          this.router.navigate(['/lignelivraison']);
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Validate Livraison Fourniture. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
    }
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
