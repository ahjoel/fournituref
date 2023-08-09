import { Employe } from "./employe.model";

export class Commande {
    id! : number;
    codeCom! : string;
    dateCom! : Date|string;
    employe! : Employe;
}