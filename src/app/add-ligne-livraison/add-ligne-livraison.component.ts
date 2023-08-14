import { Component } from '@angular/core';
import { Lignelivraison } from '../model/lignelivraison.model';
import { LignelivraisonService } from '../service/lignelivraison.service';
import { FournitureService } from '../service/fourniture.service';
import { LignecommandeService } from '../service/lignecommande.service';
import { Router } from '@angular/router';
import { LivraisonService } from '../service/livraison.service';

@Component({
  selector: 'app-add-ligne-livraison',
  templateUrl: './add-ligne-livraison.component.html',
  styleUrls: ['./add-ligne-livraison.component.css'],
})
export class AddLigneLivraisonComponent {
  ligneLivraisonObjet: Lignelivraison;
  ligneLivraisonTab: Lignelivraison[] = [];
  isedit: boolean = false;
  fournitures: any;
  data: any;
  datas: any;
  lignecommandes: any;
  codeLiv: string;
  tvaLiv: number;
  total: any;
  livraisonId: any;
  fournisseurLiv: string;
  dateLiv: Date | string;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private lignelivraisonService: LignelivraisonService,
    private livraisonService: LivraisonService,
    private fournitureService: FournitureService,
    private ligneCommandeService: LignecommandeService,
    private router: Router
  ) {
    this.ligneLivraisonObjet = new Lignelivraison();
    this.codeLiv = '';
    this.dateLiv = '';
    this.tvaLiv = 18;
    this.fournisseurLiv = '';
    this.total = 0;
  }

  ngOnInit(): void {
    this.isedit = false;
    // Initialisation du tableau des lignes de livraison(jointure)
    this.getLigneLivraison();

    this.getDataLigneCommandesNonLivree();

    this.getNewCodeLivraison();
  }

  getNewCodeLivraison() {
    this.lignelivraisonService.listeLigneLivraison().subscribe((res) => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const date_code = `INSTOCK${day}${month}${year}`;
      this.codeLiv = date_code + (res.length + 1);
    });
  }

  getDataLigneCommandesNonLivree() {
    this.ligneCommandeService
      .listeLigneCommandeNonLivree()
      .subscribe((resp) => {
        this.lignecommandes = resp;
      });
  }

  // Select pour la selection de la fourniture en fonction de la commande selectionné dans le formulaire creation de ligne livraison
  onChangeCommande() {
    // console.log('test ' + typeof(this.ligneLivraisonObjet.lignecommande));
    this.ligneLivraisonObjet.lignecommande = parseInt(
      this.ligneLivraisonObjet.lignecommande.toString(),
      10
    );
    this.ligneCommandeService
      .consulterLigneCommande(this.ligneLivraisonObjet.lignecommande)
      .subscribe((ligne_commande) => {
        this.data = ligne_commande;
        // Transformation d'un objet en tableau
        // Pour éviter l'erreur ng0220
        this.data = [this.data];
      });
  }

  // Formatage du prix total
  formatNumberWithCommas(number: number): string {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // Read Data
  getLigneLivraison() {
    const isData = localStorage.getItem('LigneLivraison');
    // Cheick data from localstorage for LigneLivraison
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.ligneLivraisonTab = localData;
    }
    // Cheick fourniture data from json server
    this.fournitureService.listeFourniture().subscribe((res) => {
      this.fournitures = res;

      this.ligneCommandeService
        .listeLigneCommandeNonLivree()
        .subscribe((res_ligne_commande) => {
          this.lignecommandes = res_ligne_commande;

          // this._commandeService.getData().subscribe(res_commande=>{
          //   this.commandes = res_commande;

          // Use join between ligneCommandeTab and fourniture to perform data show on table
          this.datas = this.ligneLivraisonTab?.map(
            (ligneLivraison: { fourniture: any; lignecommande: any }) => {
              const fourniture = this.fournitures?.find(
                (fourniture: { id: any }) =>
                  fourniture.id === ligneLivraison.fourniture
              );
              const lignecommande = this.lignecommandes?.find(
                (lignecommande: { id: any }) =>
                  lignecommande.id === ligneLivraison.lignecommande
              );
              // const commandes = this.commandes?.find((commande: { id: any; CommandeId:any }) => commande.id === lignecommande.CommandeId);
              return {
                ...ligneLivraison,
                fourniture,
                lignecommande,
                // commandes
              };

              // })
              // Calcul du prix total des livraisons
              // console.log('Data', this.datas);
            }
          );
          this.total = this.datas
            ? this.datas.reduce(
                (acc: any, cur: any) =>
                  acc + cur.qteLivraison * cur.prixLivraison * 1.18,
                0
              )
            : 0;
          // console.log('data Local'+this.datas?.fourniture )
        });
    });
    // const fournits = this.getDataFournitures();
  }

  // Mode Edit activate - LigneLivraison - Front
  onEdit(item: Lignelivraison) {
    this.isedit = true;
    // this.ligneLivraisonObjet = { ...item };
    this.ligneLivraisonObjet.id = item.id;
    this.ligneLivraisonObjet.lignecommande = item.lignecommande.id;
    this.ligneLivraisonObjet.fourniture = item.fourniture.id;
    this.ligneLivraisonObjet.qteLivraison = item.qteLivraison;
    this.ligneLivraisonObjet.prixLivraison = item.prixLivraison;
    // console.log("TEST fid "+ this.ligneLivraisonObjet.fourniture);
    // console.log("TEST item "+ item.fourniture.id);
  }
  // Create Data - LigneLivraison - Front
  onSave() {
    const isData = localStorage.getItem('LigneLivraison');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.ligneLivraisonObjet.id = 1;
      // Convert FournitureId select value string to integer to perform join
      this.ligneLivraisonObjet.fourniture = parseInt(
        this.ligneLivraisonObjet.fourniture.toString(),
        10
      );
      this.ligneLivraisonObjet.lignecommande = parseInt(
        this.ligneLivraisonObjet.lignecommande.toString(),
        10
      );
      newArr.push(this.ligneLivraisonObjet);
      // Save in localstorage
      localStorage.setItem('LigneLivraison', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);

      // Convert FournitureID select value string to integer to perform control duplicate data
      this.ligneLivraisonObjet.fourniture = parseInt(
        this.ligneLivraisonObjet.fourniture.toString(),
        10
      );
      const datafind = oldData?.find(
        (e: { fourniture: any }) =>
          e.fourniture === this.ligneLivraisonObjet.fourniture
      );

      // Convert CommandeID select value string to integer to perform control duplicate data
      this.ligneLivraisonObjet.lignecommande = parseInt(
        this.ligneLivraisonObjet.lignecommande.toString(),
        10
      );
      const datafind_1 = oldData?.find(
        (d: { lignecommande: any }) =>
          d.lignecommande === this.ligneLivraisonObjet.lignecommande
      );

      // Cheick to eliminate double record with FournitureId and LigneCommandeId
      if (datafind == null) {
        // Cheick to avoid record with null data
        if (
          this.ligneLivraisonObjet.fourniture === 0 ||
          this.ligneLivraisonObjet.qteLivraison === 0 ||
          this.ligneLivraisonObjet.prixLivraison === 0
        ) {
          alert('Veuillez remplir correctement les champs!');
        } else {
          // Get MaxID
          const maxId = oldData.reduce((max: number, item: any) => {
            return item.id > max ? item.id : max;
          }, 0);

          this.ligneLivraisonObjet.id = maxId + 1;
          // Convert FournitureID select value string to integer to perform join
          this.ligneLivraisonObjet.fourniture = parseInt(
            this.ligneLivraisonObjet.fourniture.toString(),
            10
          );
          // Convert CommandeID select value string to integer to perform join
          this.ligneLivraisonObjet.lignecommande = parseInt(
            this.ligneLivraisonObjet.lignecommande.toString(),
            10
          );
          oldData.push(this.ligneLivraisonObjet);
          // Save in localstorage
          localStorage.setItem('LigneLivraison', JSON.stringify(oldData));
        }
      } else {
        // If record with fournitureId exist, raise alert
        alert(
          'La livraison contenant cette fourniture existe déja. Veuillez choisir une nouvelle!'
        );
      }
    }
    // Reset form
    this.ligneLivraisonObjet = new Lignelivraison();
    // Refresh Table
    this.getLigneLivraison();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Update Data - LigneCommande - Front
  onUpdate(ligneLivraisonObjet: Lignelivraison) {
    const isData = localStorage.getItem('LigneLivraison');
    if (isData !== null) {
      const oldData = JSON.parse(isData);
      for (let index = 0; index < oldData.length; index++) {
        if (oldData[index].id == ligneLivraisonObjet.id) {
          // Convert fournitureID select value to integer
          this.ligneLivraisonObjet.fourniture = parseInt(
            this.ligneLivraisonObjet.fourniture.toString(),
            10
          );
          oldData[index] = this.ligneLivraisonObjet;
        }
      }

      // Update data on localstorage - Cheick to avoid record with null data
      if (
        this.ligneLivraisonObjet.fourniture === 0 ||
        this.ligneLivraisonObjet.prixLivraison === 0 ||
        this.ligneLivraisonObjet.qteLivraison === 0
      ) {
        alert('Veuillez remplir correctement les champs!');
      } else {
        localStorage.setItem('LigneLivraison', JSON.stringify(oldData));
      }
    }
    // Reset form
    this.ligneLivraisonObjet = new Lignelivraison();
    // Refresh Table
    this.getLigneLivraison();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Delete Data - LigneCommande - Front
  onDelete(item: Lignelivraison) {
    const isData = localStorage.getItem('LigneLivraison');
    if (confirm('Voulez vous vraiment supprimer cette livraison ?')) {
      if (isData != null) {
        const localData = JSON.parse(isData);
        for (let index = 0; index < localData.length; index++) {
          if (localData[index].fourniture == item.fourniture.id) {
            localData.splice(index, 1);
          }
        }
        localStorage.setItem('LigneLivraison', JSON.stringify(localData));
        this.getLigneLivraison();
        this.isedit = false;
      }
    }
  }

  onSubmit() {
    const isData = localStorage.getItem('LigneLivraison');
    // Cheick if any data in localstorage exist
    if (isData !== null) {
      const livraison = {
        id: null,
        codeLiv: this.codeLiv,
        dateLiv: this.dateLiv,
        fournisseurLiv: this.fournisseurLiv,
        tvaLiv: this.tvaLiv,
      };
      // console.log(`Data : ${this.codeCommande} et ${this.dateCommande}`);
      this.codeLiv = this.codeLiv;
      this.livraisonService.ajouterLivraison(livraison).subscribe(
        (res: any) => {
          this.livraisonId = res.id;
          // console.log('Commande Id', this.commandeId);
          const localData = JSON.parse(isData);

          // For loop to save all ligne livraisons
          for (let index = 0; index < localData.length; index++) {
            const ligneLivraisonFourniture = {
              id: null,
              etatLivraison: 'NON-VA',
              lignecommande: { id: localData[index].lignecommande },
              livraison: { id: this.livraisonId },
              fourniture: { id: localData[index].fourniture },
              qteLivraison: localData[index].qteLivraison,
              prixLivraison: localData[index].prixLivraison,
            };

            // Enregistrement de toutes les lignes de livraisons dans la table livraison
            this.lignelivraisonService
              .ajouterLigneLivraison(ligneLivraisonFourniture)
              .subscribe(
                (st: any) => {
                  // // MAJ du Statut de la ligne commande en "Livrée"
                  // // const lcom = {Statut: "Livrée"}
                  // const idlcom = st.ligneCommandeId
                  // const ligneLivraisonFournitureMAJ = {id: localData[index].LigneCommandeId, Statut: "Livrée"}
                  // // console.log('IDlcom', ligneLivraisonFournitureMAJ);
                  // this._livraisonService.updatecommandeapreslivraison(idlcom, ligneLivraisonFournitureMAJ).subscribe(up=>{})
                  // const ligneLivraisonFourniture_mouvement = { dateMouvement: new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), LigneLivraisonId: st.id, FounitureId:localData[index].FounitureId,
                  //    Qte:localData[index].Qte, Prix:localData[index].Prix, QteDispo:localData[index].Qte, Mode: 'Ajout', Statut: 'Active' }
                  // // Enregistrement de toutes les lignes de livraisons dans la table mouvement
                  // this._livraisonService.postdatalignelivraison_mouvement(ligneLivraisonFourniture_mouvement).subscribe(mou=>{})
                  // // this.submitted.emit();
                  
                },
                (error) => {
                  const errorMessage =
                    error.error.message ||
                    'Failed to save Livraison Fourniture. Please try again later.';
                  this.showMessage(errorMessage, true);
                  this.router.navigate(['/lignelivraison/add_lignelivraison']);
                }
              );
          }

          // Show Success info
          this.showMessage(
            'Livraison Fourniture ' + this.codeLiv + ' crée avec succès !',
            false
          );
          // Destroy localstorage
          this.datas.splice(0, this.datas.length);
          localStorage.removeItem('LigneLivraison');

          // Reset the form
          // this.ligneLivraisonObjet.LigneCommandeId = '';
          // Reset Commande select
          // this.ligneLivraisonObjet.LigneCommandeId = '';
          // this.ligneLivraisonObjet.FounitureId = '';
          // this.lcommandes = this.getDataCommandes();
          // Reset Commande form and create new code for order
          this.getNewCodeLivraison();
          // Reset date livraison and fournisseur input
          this.dateLiv = '';
          this.fournisseurLiv = '';
          this.total = 0;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to save Livraison. Please try again later.';
          this.showMessage(errorMessage, true);
          this.router.navigate(['/lignecommande/add_lignecommande']);
        }
      );
    } else {
      alert('Veuillez insérer au moins une ligne de livraison de fourniture.');
    }
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
