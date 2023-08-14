import { Component } from '@angular/core';
import { Lignelivraison } from '../model/lignelivraison.model';
import { Livraison } from '../model/livraison.model';
import { Fourniture } from '../model/fourniture.model';
import { Lignecommande } from '../model/lignecommande.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FournitureService } from '../service/fourniture.service';
import { LivraisonService } from '../service/livraison.service';
import { LignecommandeService } from '../service/lignecommande.service';
import { LignelivraisonService } from '../service/lignelivraison.service';

@Component({
  selector: 'app-edit-ligne-livraison',
  templateUrl: './edit-ligne-livraison.component.html',
  styleUrls: ['./edit-ligne-livraison.component.css']
})
export class EditLigneLivraisonComponent {
  currentLigneLivraison = new Lignelivraison();
  fournitures!: Fourniture[];
  livraisons!: Livraison[];
  lignecommandes!: Lignecommande[];
  updatedLivId!: number;
  updatedLigneComId!: number;
  updatedFourId!: number;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ligneCommandeService: LignecommandeService,
    private livraisonService: LivraisonService,
    private lignelivraisonService: LignelivraisonService,
    private fournitureService: FournitureService
  ) {}

  ngOnInit() {
    this.livraisonService.listeLivraison().subscribe((ls) => {
      this.livraisons = ls;
    });
    this.fournitureService.listeFourniture().subscribe((fs) => {
      this.fournitures = fs;
    });
    this.ligneCommandeService.listeLigneCommande().subscribe((lc) => {
      this.lignecommandes = lc;
    });
    // this.currentLigneCommande.dateModification = new Date();
    this.lignelivraisonService
      .consulterLigneLivraison(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (lv) => {
          this.currentLigneLivraison = lv;
          this.updatedLivId = this.currentLigneLivraison.livraison.id;
          this.updatedLigneComId = this.currentLigneLivraison.lignecommande.id;
          this.updatedFourId = this.currentLigneLivraison.fourniture.id;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Load Livraison Fourniture. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
  }

  updateLigneLivraison() {
    this.lignelivraisonService.modifierLigneLivraison(this.currentLigneLivraison).subscribe(
      (lv) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/lignelivraison/edit_lignelivraison']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit Livraison Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
