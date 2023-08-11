import { Fourniture } from "./fourniture.model";
import { Lignecommande } from "./lignecommande.model";
import { Livraison } from "./livraison.model";

export class Lignelivraison {
    id!: number;
    qteLivraison!: number;
    prixLivraison!: number;
    etatLivraison!: string;
    livraison!: Livraison|any;
    ligneCommande!: Lignecommande|any;
    fourniture!: Fourniture|any;
  }
  