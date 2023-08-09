import { Component } from '@angular/core';
import { Lignecommande } from '../model/lignecommande.model';
import { Fourniture } from '../model/fourniture.model';
import { Commande } from '../model/commande.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LignecommandeService } from '../service/lignecommande.service';
import { FournitureService } from '../service/fourniture.service';
import { CommandeService } from '../service/commande.service';

@Component({
  selector: 'app-edit-ligne-commande',
  templateUrl: './edit-ligne-commande.component.html',
  styleUrls: ['./edit-ligne-commande.component.css']
})
export class EditLigneCommandeComponent {
  currentLigneCommande = new Lignecommande();
  fournitures!: Fourniture[];
  commandes!: Commande[];
  updatedComId!: number;
  updatedFourId!: number;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ligneCommandeService: LignecommandeService,
    private commandeService: CommandeService,
    private fournitureService: FournitureService
  ) {}

  ngOnInit() {
    this.commandeService.listeCommande().subscribe((cs) => {
      this.commandes = cs;
      //console.log(cats);
    });
    this.fournitureService.listeFourniture().subscribe((fs) => {
      this.fournitures = fs;
      //console.log(cats);
    });
    // this.currentLigneCommande.dateModification = new Date();
    this.ligneCommandeService
      .consulterLigneCommande(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (lc) => {
          this.currentLigneCommande = lc;
          this.updatedComId = this.currentLigneCommande.commande.id;
          this.updatedFourId = this.currentLigneCommande.fourniture.id;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Load Commande Fourniture. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
  }

  updateLigneCommande() {
    this.ligneCommandeService.modifierLigneCommande(this.currentLigneCommande).subscribe(
      (lc) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/lignecommande/edit_lignecommande']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit Commande Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
