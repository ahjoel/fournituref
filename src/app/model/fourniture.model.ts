import { Categorie } from './categorie.model';

export class Fourniture {
  id!: number;
  codeFour!: string;
  nomFour!: number;
  mesureFour!: string;
  qteMinFour!: number;
  // dateCreation!: Date;
  // dateModification!: Date;
  categorie!: Categorie;
  etatFour!: string;
}
