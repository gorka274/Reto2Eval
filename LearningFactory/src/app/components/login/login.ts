import { Component } from '@angular/core';
import { Serviciousuario } from '../../services/serviciousuario';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
    styleUrl: './login.scss',

})
export class Login {
  email: string = '';
  password: string = '';

  constructor(
    private usuarioService: Serviciousuario,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      const user = usuarios.find(
        (u) => u.correoElectronico === this.email && u.password === this.password
      );

      if (user) {
        this.authService.login(user); // guarda usuario en localStorage
        alert(`Bienvenido ${user.nombre}`);
        this.router.navigate(['/home']); // redirige al home
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
