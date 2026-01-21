import { Injectable } from '@angular/core';
import { Usuario, Rol } from '../models/usuarios';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usuarioLogueado: Usuario | null = null;

  constructor(    private router: Router) {
    const user = localStorage.getItem('usuarioLogueado');
    if (user) {
      this.usuarioLogueado = JSON.parse(user);
    }
  }

  login(usuario: Usuario) {
    this.usuarioLogueado = usuario;
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  }

  logout() {
    this.usuarioLogueado = null;
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['home']);


  }

  getUsuario(): Usuario | null {
    return this.usuarioLogueado;
  }

  estaLogueado(): boolean {
    return this.usuarioLogueado !== null;
  }

  esAdmin(): boolean {
    return this.usuarioLogueado?.rol === Rol.ADMIN;
  }
}
