import { Injectable } from '@angular/core';
import { Employe } from '../model/employe.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURLEmp, apiURLEmpList } from '../config';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  employes: Employe[];
  constructor(private http: HttpClient) {}

  consulterEmploye(id: number): Observable<Employe> {
    const url = `${apiURLEmp}/${id}`;
    return this.http.get<Employe>(url);
  }

  listeEmploye(): Observable<Employe[]> {
    return this.http.get<Employe[]>(apiURLEmpList);
  }

  ajouterEmploye(em: Employe): Observable<Employe> {
    return this.http.post<Employe>(apiURLEmp + '/addemp', em, httpOptions);
  }

  modifierEmploye(em: Employe): Observable<Employe> {
    return this.http.put<Employe>(apiURLEmp + '/modifieremp', em, httpOptions);
  }

  supprimerEmploye(id: any) {
    const url = `${apiURLEmp}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
