import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuario } from './usuario';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { "usuario": usuario, "contrasena": contrasena });
  }

  registro(rol:string, usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, 
    { "rol": rol,
      "usuario": usuario, 
      "contrasena": contrasena 
    })
  }

  registroPropietario(
    rol:string,
    usuario: string, 
    contrasena: string,
    nombre:string,
    apellidos:string,
    tipoIdentificacion:string,
    numeroIdentificacion:string,
    correo:string,
    celular:string
    ): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/signin`, 
      { "rol": rol,
        "usuario": usuario, 
        "contrasena": contrasena,
        "nombre": nombre,
        "apellidos": apellidos,
        "tipoIdentificacion": tipoIdentificacion,
        "identificacion": numeroIdentificacion,
        "correo": correo,
        "celular": celular
      })
  }

}
