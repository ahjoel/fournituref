import { Fourniture } from './fourniture.model';
import { Lignelivraison } from './lignelivraison.model';
import { Sortie } from './sortie.model';

export class Mouvement {
  id!: number;
  codeMouv!: string;
  datemouv!: Date|string;
  dateInventaire!: Date|string;
  qteMouv!: number;
  natureMouv!: string;
  fourniture!: Fourniture|any;
  lignelivraison!: Lignelivraison|any;
  sortie!: Sortie;
  etatMouv!: string;
}
