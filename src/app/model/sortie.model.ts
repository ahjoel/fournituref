import { Employe } from './employe.model';
import { Fourniture } from './fourniture.model';

export class Sortie {
  id!: number;
  codeSort!: string;
  dateSort!: Date|string;
  qteSort!: number;
  etatSort!: string;
  fourniture!: Fourniture;
  employe!: Employe;
}
