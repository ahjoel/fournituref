import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lignelivraison } from '../model/lignelivraison.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURLLivList, apiURLlLiv, apiURLlLivList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class LignelivraisonService {
  lignelivraison: Lignelivraison[];
  constructor(private http: HttpClient) {}

  consulterLigneLivraison(id: number): Observable<Lignelivraison> {
    const url = `${apiURLlLiv}/${id}`;
    return this.http.get<Lignelivraison>(url);
  }

  listeLigneLivraison(): Observable<Lignelivraison[]> {
    return this.http.get<Lignelivraison[]>(apiURLlLivList);
  }

  ajouterLigneLivraison(ll: Lignelivraison): Observable<Lignelivraison> {
    return this.http.post<Lignelivraison>(apiURLlLiv + '/addlliv', ll, httpOptions);
  }

  modifierLigneLivraison(ll: Lignelivraison): Observable<Lignelivraison> {
    return this.http.put<Lignelivraison>(apiURLlLiv + '/modifierlliv', ll, httpOptions);
  }

  supprimerLigneLivraison(id: any) {
    const url = `${apiURLlLiv}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
