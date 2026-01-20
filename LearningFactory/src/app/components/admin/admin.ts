import { Usuario } from '../../models/usuarios';
import { Component, inject } from '@angular/core';
import { Serviciousuario } from '../../services/serviciousuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})

export class Admin {


    private usersService = inject(Serviciousuario);

    users: Usuario[] = [];
    usuariosCategory: string[] = [];

    usuariosFiltered: Usuario[] = [];

    index: number = 0;

    constructor(private router: Router) {
    this.usersService.getUsuarios().subscribe({
    next: (users) => {
      console.log('USUARIOS =>', this.users);
      this.users = users;
      this.usuariosFiltered = users;
      console.log('USUARIOS FILTRADOS =>', this.usuariosFiltered);
      this.usuariosCategory = Array.from(
        new Set(users.map((u: Usuario) => u.rol))
      );
    },
    error: (err) => console.error(err)
  });
}

    //Eliminar usuario
    eliminarUsuario(id: number) {
      //Validacion
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        this.usersService.deleteUsuario(id).subscribe({
          next: () => {
            console.log(`Usuario con ID ${id} eliminado correctamente`);
            //Actualizar la lista al usuario eliminado
            this.usuariosFiltered = this.usuariosFiltered.filter(user => user.id !== id);
            this.users = this.users.filter(user => user.id !== id);
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            alert('Hubo un error al eliminar el usuario');
          }
        });
      }
    }
}
