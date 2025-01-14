import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EgresoTsService {
  private baseUrl = "https://presupuesto-back-end.onrender.com/egreso"
  constructor( private http: HttpClient) { }

  //Todos los egresos
  getEgresos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  //1 egreso en particular
  getEgreso(id: string ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`)
  }
  //Insertar
  saveEgreso(egreso: any):Observable<any>{
    return this.http.post<any>(this.baseUrl, egreso )
  }

  //Actualizar
  updateEgreso(egreso:any):Observable<any>{
    const id = egreso._id
    return this.http.put<any>(`${this.baseUrl}/${id}`, egreso)
  }

  //Eliminar
  deleteEgreso(id:string):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
