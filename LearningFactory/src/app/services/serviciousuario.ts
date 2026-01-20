import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Rol } from '../models/usuarios';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class Serviciousuario {

    private url = 'http://localhost:3000/usuarios';



      getUsuarios(): Observable<any> {
      return this.http.get(this.url);
      }

      //Eliminar usuario
      deleteUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}`, httpOptions);
      }

      usuario: Usuario = {id: 0, nombre: '', apellido: '', correoElectronico: '', telefono: '', rol: Rol.USER };
      constructor(private http: HttpClient) {}



  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correoElectronico: '',
    telefono: '',
    password: '',
    rol: Rol.USER,
  };
  constructor(private http: HttpClient) {}

  alta(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario, httpOptions);
  }
}
