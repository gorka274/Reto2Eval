import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Serviciousuario } from '../../services/serviciousuario';
import { Usuario, Rol } from '../../models/usuarios';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  private router = inject(Router);
  private serviciousuario = inject(Serviciousuario);

  userX: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correoElectronico: '',
    telefono: '',
    password: '',
    rol: Rol.USER,
  };

  lastUserId!: number;

  alta() {
    this.serviciousuario.getUsuarios().subscribe((users: Usuario[]) => {
      if (users.length > 0) {
        const ultimo = users[users.length - 1];
        this.userX.id = ultimo.id + 1;
      } else {
        this.userX.id = 1;
      }

      this.serviciousuario.alta(this.userX).subscribe(() => {
        alert('nuevo usuario aceptado');
        this.router.navigate(['home']);
      });
    });
  }
}
