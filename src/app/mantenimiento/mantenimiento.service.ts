import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mantenimiento } from './mantenimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  obtenerMantenimientos(idPropiedad: number): Observable<Mantenimiento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<Mantenimiento[]>(`${this.apiUrl}/propiedades/${idPropiedad}/mantenimientos`, { headers: headers });
  }

  crearMantenimiento(mantenimiento: Mantenimiento, idPropiedad: number): Observable<Mantenimiento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post<Mantenimiento>(`${this.apiUrl}/propiedades/${idPropiedad}/mantenimientos`, mantenimiento, { headers: headers });
  }


}
