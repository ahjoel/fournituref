import { environment } from "src/environments/environment";

export const apiURLCatList: string = `${environment.apiBaseUrl}/api/categories`;
export const apiURLCat: string = `${environment.apiBaseUrl}/api/categorie`;

export const apiURLEmpList: string = `${environment.apiBaseUrl}/api/employes`;
export const apiURLEmp: string = `${environment.apiBaseUrl}/api/employe`;

export const apiURLFourList: string = `${environment.apiBaseUrl}/api/fournitures`;
export const apiURLFour: string = `${environment.apiBaseUrl}/api/fourniture`;

export const apiURLlComList: string = `${environment.apiBaseUrl}/api/lignecommandes`;
export const apiURLlCom: string = `${environment.apiBaseUrl}/api/lignecommande`;

export const apiURLComList: string = `${environment.apiBaseUrl}/api/commandes`;
export const apiURLCom: string = `${environment.apiBaseUrl}/api/commande`;

export const apiURLLivList: string = `${environment.apiBaseUrl}/api/livraisons`;
export const apiURLLiv: string = `${environment.apiBaseUrl}/api/livraison`;

export const apiURLLcomNonLivree: string = `${environment.apiBaseUrl}/api/lignecommandes/nonlivree`;
export const apiURLlLivList: string = `${environment.apiBaseUrl}/api/lignelivraisons`;
export const apiURLlLiv: string = `${environment.apiBaseUrl}/api/lignelivraison`;

export const apiURLSortList: string = `${environment.apiBaseUrl}/api/sorties`;
export const apiURLSort: string = `${environment.apiBaseUrl}/api/sortie`;

export const apiURLMouvList: string = `${environment.apiBaseUrl}/api/mouvements`;
export const apiURLMouv: string = `${environment.apiBaseUrl}/api/mouvement`;