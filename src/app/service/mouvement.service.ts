import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mouvement } from '../model/mouvement.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURLMouv, apiURLMouvList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  mouvement: Mouvement[];
  constructor(private http: HttpClient) {}

  consulterMouvement(id: number): Observable<Mouvement> {
    const url = `${apiURLMouv}/${id}`;
    return this.http.get<Mouvement>(url);
  }

  listeMouvement(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(apiURLMouvList);
  }

  ajouterMouvement(m: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(apiURLMouv + '/addmouv', m, httpOptions);
  }

  modifierMouvement(m: Mouvement): Observable<Mouvement> {
    return this.http.put<Mouvement>(apiURLMouv + '/modifiermouv', m, httpOptions);
  }

  supprimerMouv(id: any) {
    const url = `${apiURLMouv}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
