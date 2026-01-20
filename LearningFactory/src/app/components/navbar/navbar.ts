// import { Component } from '@angular/core';
// import { RouterLink } from "@angular/router";

// @Component({
//   selector: 'app-navbar',
//   imports: [RouterLink],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.scss',
// })
// export class Navbar {

// }
import { Component, effect } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';


 @Component({
   selector: 'app-navbar',
   imports: [RouterLink, CommonModule],
   standalone: true,
   templateUrl: './navbar.html',
   styleUrl: './navbar.scss',
 })

export class Navbar {
  constructor(public authService: AuthService) {
    // Efecto que se ejecuta cada vez que cambia el usuario logueado
    effect(() => {
      const usuario = this.authService.getUsuario();
      if (usuario) {
        console.log('Usuario logueado:', usuario.correoElectronico, usuario.password);
      } else {
        console.log('Nadie está logueado');
      }
    });
  }
}
