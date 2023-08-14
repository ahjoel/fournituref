import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sortie } from '../model/sortie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURLSort, apiURLSortList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class SortieService {
  sortie: Sortie[];
  constructor(private http: HttpClient) {}

  consulterSortie(id: number): Observable<Sortie> {
    const url = `${apiURLSort}/${id}`;
    return this.http.get<Sortie>(url);
  }

  listeSortie(): Observable<Sortie[]> {
    return this.http.get<Sortie[]>(apiURLSortList);
  }

  ajouterSortie(s: Sortie): Observable<Sortie> {
    return this.http.post<Sortie>(apiURLSort + '/addsor', s, httpOptions);
  }

  modifierSortie(s: Sortie): Observable<Sortie> {
    return this.http.put<Sortie>(apiURLSort + '/modifiersor', s, httpOptions);
  }

  supprimerSortie(id: any) {
    const url = `${apiURLSort}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
