import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private baseUrl = "https://presupuesto-back-end.onrender.com/consulta"
  constructor( private http: HttpClient) { }

  //Consulta
  getConsulta(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }
}
