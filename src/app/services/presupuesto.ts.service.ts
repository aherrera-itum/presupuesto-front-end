import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PresupuestoTsService {
  private baseUrl = "http://localhost:5000/presupuesto"

  constructor( private http: HttpClient) { }

  //Todos los presupuestos
  getPresupuestos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  //1 presupuesto en particular
  getPresupuesto(id: string ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`)
  }
  //Insertar
  savePresupuesto(presupuesto: any):Observable<any>{
    return this.http.post<any>(this.baseUrl, presupuesto )
  }

  //Actualizar
  updatePresupuesto(presupuesto:any):Observable<any>{
    const id = presupuesto._id
    return this.http.put<any>(`${this.baseUrl}/${id}`, presupuesto)
  }

  //Eliminar
  deletePresupuesto(id:string):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
