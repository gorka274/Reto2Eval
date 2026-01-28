import { Component, effect } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';


 @Component({
   selector: 'app-navbar',
   imports: [RouterLink, CommonModule],
   standalone: true,
   templateUrl: './navbar.html',
   styleUrl: './navbar.scss',
 })

export class Navbar {
  menuAbierto = false;

  constructor(public authService: AuthService, private router: Router) {
    effect(() => {
      const usuario = this.authService.getUsuario();
      if (usuario) {
        console.log('Usuario logueado:', usuario.correoElectronico, usuario.password);
      } else {
        console.log('Nadie está logueado');
      }
    });

    // Cerrar menú automáticamente cuando se navega
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuAbierto = false;
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
