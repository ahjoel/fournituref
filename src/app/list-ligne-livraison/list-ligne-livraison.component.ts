import { Component } from '@angular/core';
import { Lignelivraison } from '../model/lignelivraison.model';
import { LignelivraisonService } from '../service/lignelivraison.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';
import { LignecommandeService } from '../service/lignecommande.service';
import { Lignecommande } from '../model/lignecommande.model';
import { Mouvement } from '../model/mouvement.model';
import { MouvementService } from '../service/mouvement.service';

@Component({
  selector: 'app-list-ligne-livraison',
  templateUrl: './list-ligne-livraison.component.html',
  styleUrls: ['./list-ligne-livraison.component.css'],
})
export class ListLigneLivraisonComponent {
  lignelivraisons: Lignelivraison[];
  mouvement= new Mouvement();
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
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Delete Livraison Fournitures. Livraison liée.';
          this.showMessage(errorMessage, true);
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
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const date_code = `${year}-${month}-${day}`;

      const lignemouvement = {
        id: null,
        datemouv: date_code,
        natureMouv: 'IN',
        lignelivraison: { id: lv.id },
        fourniture: { id: lv.fourniture.id },
        qteMouv: lv.qteLivraison, 
        sortie: null,
        codeMouv: null,
        dateInventaire: null,
        etatMouv: 'ACTIVE',
      };
      
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

          this.mouvementService.ajouterMouvement(lignemouvement).subscribe(
            () => {},
            (error) => {
              const errorMessage =
                error.error.message ||
                'Failed to Add This Delivery in Mouvement Table. Please try again later.';
              this.showMessage(errorMessage, true);
            }
          );

          this.showMessage('Validation de '+ lv.livraison.codeLiv +' effectuée!', false);
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
