import { Component } from '@angular/core';
import { Lignecommande } from '../model/lignecommande.model';
import { FournitureService } from '../service/fourniture.service';
import { CommandeService } from '../service/commande.service';
import { EmployeService } from '../service/employe.service';
import { LignecommandeService } from '../service/lignecommande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ligne-commande',
  templateUrl: './add-ligne-commande.component.html',
  styleUrls: ['./add-ligne-commande.component.css'],
})
export class AddLigneCommandeComponent {
  ligneCommandeObjet: Lignecommande;
  ligneCommandeTab: Lignecommande[] = [];
  isedit: boolean = false;
  data: any;
  fournitures: any;
  fourniture: any;
  commandes: any;
  commande: any;
  employes: any;
  employe: any;
  codeCom: string;
  dateCom: Date | string;
  commandeId: any;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private fournitureService: FournitureService,
    private lignecommandeService: LignecommandeService,
    private employeService: EmployeService,
    private commandeService: CommandeService,
    private router: Router
  ) {
    this.ligneCommandeObjet = new Lignecommande();
    this.codeCom = '';
    this.dateCom = '';
  }

  ngOnInit(): void {
    this.isedit = false;
    // Initialisation du tableau des lignes de commandes(jointure)
    this.getLigneCommande();
    // Initialisation du select des fournitures
    this.getDataFournitures();

    this.getDataCommandes();
    // Initialisation du select des employes
    this.getDataEmployes();
    // Initialisation d'un nouveau code pour la commande
    this.getNewCodeCommande();
  }

  // Get data for fournitures
  getDataFournitures() {
    this.fournitureService.listeFourniture().subscribe((res) => {
      this.fournitures = res;
    });
  }

  // Get data for Commandes
  getDataCommandes() {
    this.commandeService.listeCommande().subscribe((resp) => {
      this.commandes = resp;
    });
  }

  // Get data for Employes
  getDataEmployes() {
    this.employeService.listeEmploye().subscribe((resp) => {
      this.employes = resp;
    });
  }

  // Get Code commande
  getNewCodeCommande() {
    this.commandeService.listeCommande().subscribe((res) => {
      // Recuperation de la date actuelle, comptage des commandes existantes avec incrementation pour une nouvelle
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const date_code = `CMD${day}${month}${year}`;
      this.codeCom = date_code + (res.length + 1);
    });
  }

  // Create Data - LigneCommande - Front
  onSave() {
    const isData = localStorage.getItem('LigneCommande');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.ligneCommandeObjet.id = 1;
      // Convert FournitureId select value string to integer to perform join
      this.ligneCommandeObjet.fourniture = parseInt(
        this.ligneCommandeObjet.fourniture.toString(),
        10
      );
      newArr.push(this.ligneCommandeObjet);
      // Save in localstorage
      localStorage.setItem('LigneCommande', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);

      // Convert FournitureID select value string to integer to perform control duplicate data
      this.ligneCommandeObjet.fourniture = parseInt(
        this.ligneCommandeObjet.fourniture.toString(),
        10
      );
      const datafind = oldData?.find(
        (e: { fourniture: any }) =>
          e.fourniture === this.ligneCommandeObjet.fourniture
      );

      // Cheick to eliminate double record with FournitureId
      if (datafind == null) {
        // Cheick to avoid record with null data
        if (
          this.ligneCommandeObjet.fourniture === 0 ||
          this.ligneCommandeObjet.qteLigneCom === 0
        ) {
          alert('Veuillez remplir correctement les champs!');
        } else {
          // Get MaxID
          const maxId = oldData.reduce((max: number, item: any) => {
            return item.id > max ? item.id : max;
          }, 0);

          this.ligneCommandeObjet.id = maxId + 1;
          // Convert FournitureID select value string to integer to perform join
          this.ligneCommandeObjet.fourniture = parseInt(
            this.ligneCommandeObjet.fourniture.toString(),
            10
          );
          oldData.push(this.ligneCommandeObjet);
          // Save in localstorage
          localStorage.setItem('LigneCommande', JSON.stringify(oldData));
        }
      } else {
        // If record with fournitureId exist, raise alert
        alert('La fourniture existe déja. Veuillez choisir une nouvelle!');
      }
    }
    // Reset form
    this.ligneCommandeObjet = new Lignecommande();
    // Refresh Table
    this.getLigneCommande();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Read Data
  getLigneCommande() {
    const isData = localStorage.getItem('LigneCommande');
    // Cheick data from localstorage for LigneCommande
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.ligneCommandeTab = localData;
    }
    // Cheick fourniture data from json server
    this.fournitureService.listeFourniture().subscribe((resp) => {
      this.fournitures = resp;

      // Use join between ligneCommandeTab and fourniture to perform data show on table
      this.data = this.ligneCommandeTab?.map(
        (ligneCommande: { fourniture: any }) => {
          const fourniture = this.fournitures?.find(
            (fourniture: { id: any }) =>
              fourniture.id === ligneCommande.fourniture
          );
          return {
            ...ligneCommande,
            fourniture,
          };
        }
      );
    });
  }

  // Mode Edit activate - LigneCommande - Front
  onEdit(item: Lignecommande) {
    this.isedit = true;
    this.ligneCommandeObjet.id = item.id;
    this.ligneCommandeObjet.fourniture = item.fourniture.id;
    this.ligneCommandeObjet.qteLigneCom = item.qteLigneCom;
  }

  // Update Data - LigneCommande - Front
  onUpdate(ligneCommandeObjet: Lignecommande) {
    const isData = localStorage.getItem('LigneCommande');
    if (isData !== null) {
      const oldData = JSON.parse(isData);
      for (let index = 0; index < oldData.length; index++) {
        if (oldData[index].id == ligneCommandeObjet.id) {
          // Convert fournitureID select value to integer
          this.ligneCommandeObjet.fourniture = parseInt(
            this.ligneCommandeObjet.fourniture.toString(),
            10
          );
          oldData[index] = this.ligneCommandeObjet;
        }
      }

      // Update data on localstorage - Cheick to avoid record with null data
      if (
        this.ligneCommandeObjet.fourniture === 0 ||
        this.ligneCommandeObjet.qteLigneCom === 0
      ) {
        alert('Veuillez remplir correctement les champs!');
      } else {
        localStorage.setItem('LigneCommande', JSON.stringify(oldData));
      }
    }
    // Reset form
    this.ligneCommandeObjet = new Lignecommande();
    // Refresh Table
    this.getLigneCommande();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Delete Data - LigneCommande - Front
  onDelete(item: Lignecommande) {
    const isData = localStorage.getItem('LigneCommande');
    if (confirm('Voulez vous vraiment supprimer cette fourniture ?')) {
      if (isData != null) {
        const localData = JSON.parse(isData);
        for (let index = 0; index < localData.length; index++) {
          if (localData[index].fourniture == item.fourniture.id) {
            localData.splice(index, 1);
          }
        }
        localStorage.setItem('LigneCommande', JSON.stringify(localData));
        this.getLigneCommande();
        this.isedit = false;
      }
    }
  }

  // Save Commande to json
  onSubmit() {
    const isData = localStorage.getItem('LigneCommande');
    // Cheick if any data in localstorage exist
    if (isData !== null) {
      const commande = {
        id: null,
        codeCom: this.codeCom,
        dateCom: this.dateCom,
        employe: this.employe,
      };

      // Deserialize Employe Id
      commande.employe = this.employes.find((emp) => emp.id == this.employe)!;
      // console.log(`Data : ${this.codeCommande} et ${this.dateCommande}`);
      this.codeCom = this.codeCom;
      this.commandeService.ajouterCommande(commande).subscribe(
        (res: any) => {
          this.commandeId = res.id;
          console.log('Commande Id', this.commandeId);
          const localData = JSON.parse(isData);

          // For loop to save all ligne commandes
          for (let index = 0; index < localData.length; index++) {
            const ligneCommandeFourniture = {
              id: null,
              commande: { id: this.commandeId },
              fourniture: localData[index].fourniture,
              qteLigneCom: localData[index].qteLigneCom,
              etatLigneCom: 'Non Livrée',
            };
            // Deserialize Fourniture Id
            ligneCommandeFourniture.fourniture = this.fournitures.find(
              (four) => four.id == localData[index].fourniture
            )!;

            this.lignecommandeService
              .ajouterLigneCommande(ligneCommandeFourniture)
              .subscribe(
                (st) => {},
                (error) => {
                  const errorMessage =
                    error.error.message ||
                    'Failed to save Commande Fourniture. Please try again later.';
                  this.showMessage(errorMessage, true);
                  this.router.navigate(['/lignecommande/add_lignecommande']);
                }
              );
          }

          // Show Success info
          this.showMessage(
            'Commande Fourniture ' + this.codeCom + ' crée avec succès !',
            false
          );
          // Destroy localstorage
          localStorage.removeItem('LigneCommande');
          this.data.splice(0, this.data.length);

          // Reset Commande form and create new code for order
          this.getNewCodeCommande();
          // Reset date commande input
          this.dateCom = '';
          this.employe = null;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to save Commande. Please try again later.';
          this.showMessage(errorMessage, true);
          this.router.navigate(['/lignecommande/add_lignecommande']);
        }
      );
    } else {
      alert('Veuillez insérer au moins une ligne de commande de fourniture.');
    }
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
