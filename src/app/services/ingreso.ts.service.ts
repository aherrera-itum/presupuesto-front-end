import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoTsService {
  private baseUrl = "http://localhost:5000/ingreso"
  constructor( private http: HttpClient) { }

  //Todos los ingresos
  getIngresos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  //1 ingreso en particular
  getIngreso(id: string ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`)
  }
  //Insertar
  saveIngreso(ingreso: any):Observable<any>{
    return this.http.post<any>(this.baseUrl, ingreso )
  }

  //Actualizar
  updateIngreso(ingreso:any):Observable<any>{
    const id = ingreso._id
    return this.http.put<any>(`${this.baseUrl}/${id}`, ingreso)
  }

  //Eliminar
  deleteIngreso(id:string):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
