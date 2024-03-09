import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Propiedad } from './propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  darPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propiedades`, { headers: this.getHeaders() });
  }

  darPropiedad(idPropiedad: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, { headers: this.getHeaders() });
  }

  crearPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    return this.http.post<Propiedad>(`${this.apiUrl}/propiedades`, propiedad, { headers: this.getHeaders() });
  }

  editarPropiedad(propiedad: Propiedad, idPropiedad: number): Observable<Propiedad> {
    return this.http.put<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, propiedad, { headers: this.getHeaders() });
  }

  borrarPropiedad(idPropiedad: number): Observable<Propiedad> {
    return this.http.delete<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, { headers: this.getHeaders() });
  }
}
