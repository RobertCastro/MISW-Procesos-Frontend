import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banco, TipoMovimiento, TipoMantenimitento, Periocidad } from './enums';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  bancos(): Observable<Banco[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/bancos`, { headers: headers });
  }

  tiposMovimiento(): Observable<TipoMovimiento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/tipo-movimientos`, { headers: headers });
  }

  tiposMantenimiento(): Observable<TipoMantenimitento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/tipo-mantenimientos`, { headers: headers });
  }

  listaPeriocidad(): Observable<Periocidad[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/periocidad`, { headers: headers });
  }


}
