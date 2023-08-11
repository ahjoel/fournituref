import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Livraison } from '../model/livraison.model';
import { apiURLLiv, apiURLLivList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  livraison: Livraison[];
  constructor(private http: HttpClient) {}

  consulterLivraison(id: number): Observable<Livraison> {
    const url = `${apiURLLiv}/${id}`;
    return this.http.get<Livraison>(url);
  }

  listeLivraison(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(apiURLLivList);
  }

  ajouterLivraison(l: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(apiURLLiv + '/addliv', l, httpOptions);
  }
}
