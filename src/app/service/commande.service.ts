import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../model/commande.model';
import { Observable } from 'rxjs';
import { apiURLCom, apiURLComList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  commande: Commande[];
  constructor(private http: HttpClient) {}

  consulterCommande(id: number): Observable<Commande> {
    const url = `${apiURLCom}/${id}`;
    return this.http.get<Commande>(url);
  }

  listeCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(apiURLComList);
  }

  ajouterCommande(c: Commande): Observable<Commande> {
    return this.http.post<Commande>(apiURLCom + '/addcom', c, httpOptions);
  }
}
