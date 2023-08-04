import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURLCat, apiURLCatList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  categories: Categorie[];
  constructor(private http: HttpClient) {}

  consulterCategorie(id: number): Observable<Categorie> {
    const url = `${apiURLCat}/${id}`;
    return this.http.get<Categorie>(url);
  }

  listeCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURLCatList);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(apiURLCat + '/addcat', cat, httpOptions);
  }

  modifierCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(apiURLCat + '/modifiercat', cat, httpOptions);
  }

  supprimerCategorie(id: number) {
    const url = `${apiURLCat}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
