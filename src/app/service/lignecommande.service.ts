import { Injectable } from '@angular/core';
import { Lignecommande } from '../model/lignecommande.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURLlCom, apiURLlComList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LignecommandeService {
  lignecommande: Lignecommande[];
  constructor(private http: HttpClient) {}

  consulterLigneCommande(id: number): Observable<Lignecommande> {
    const url = `${apiURLlCom}/${id}`;
    return this.http.get<Lignecommande>(url);
  }

  listeLigneCommande(): Observable<Lignecommande[]> {
    return this.http.get<Lignecommande[]>(apiURLlComList);
  }

  ajouterLigneCommande(lc: Lignecommande): Observable<Lignecommande> {
    return this.http.post<Lignecommande>(apiURLlCom + '/addlcom', lc, httpOptions);
  }

  modifierLigneCommande(lc: Lignecommande): Observable<Lignecommande> {
    return this.http.put<Lignecommande>(apiURLlCom + '/modifierlcom', lc, httpOptions);
  }

  supprimerLigneCommande(id: any) {
    const url = `${apiURLlCom}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
