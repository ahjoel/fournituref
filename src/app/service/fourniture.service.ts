import { Injectable } from '@angular/core';
import { Fourniture } from '../model/fourniture.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURLFour, apiURLFourList } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class FournitureService {
  fourniture: Fourniture[];
  constructor(private http: HttpClient) {}

  consulterFourniture(id: number): Observable<Fourniture> {
    const url = `${apiURLFour}/${id}`;
    return this.http.get<Fourniture>(url);
  }

  listeFourniture(): Observable<Fourniture[]> {
    return this.http.get<Fourniture[]>(apiURLFourList);
  }

  ajouterFourniture(f: Fourniture): Observable<Fourniture> {
    return this.http.post<Fourniture>(apiURLFour + '/addfour', f, httpOptions);
  }

  modifierFourniture(f: Fourniture): Observable<Fourniture> {
    return this.http.put<Fourniture>(apiURLFour + '/modifierfour', f, httpOptions);
  }

  supprimerFourniture(id: any) {
    const url = `${apiURLFour}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
