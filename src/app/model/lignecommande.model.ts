import { Commande } from "./commande.model";
import { Fourniture } from "./fourniture.model";

export class Lignecommande {
    id!: number;
    qteLigneCom!: number;
    fourniture!: Fourniture|any;
    commande!: Commande|any;
    etatLigneCom!: string;
  }
  