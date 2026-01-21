import { Usuario } from '../../models/usuarios';
import { Component, inject, signal } from '@angular/core';
import { Serviciousuario } from '../../services/serviciousuario';
import { Router } from '@angular/router';
import { Maquina } from '../../models/maquina';
import { Serviciomaquina } from '../../services/serviciomaquina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})

export class Admin {

   /* private usersService = inject(Serviciousuario);

    users: Usuario[] = [];
    usuariosCategory: string[] = [];

    usuariosFiltered: Usuario[] = [];

    index: number = 0;



    constructor(private router: Router) {
    this.usersService.getUsuarios().subscribe({
    next: (users) => {
      this.users = users;
      console.log('USUARIOS =>', this.users);
      this.usuariosFiltered = users;
      console.log('USUARIOS FILTRADOS =>', this.usuariosFiltered);
      this.usuariosCategory = Array.from(
        new Set(users.map((u: Usuario) => u.rol))
      );
    },
    error: (err) => console.error(err)
    });
  } */

  private usersService = inject(Serviciousuario);

    users = signal<Usuario[]>([]);
    usuariosCategory = signal<string[]>([]);

    usuariosFiltered = signal<Usuario[]>([]);

    index = signal<number>(0);


    private maquinaService = inject(Serviciomaquina);

    // Usamos un Signal para manejar el estado de forma reactiva
    datosMaquina = signal<Maquina | null>(null);

    //Variables para el modal de modificar
    mostrarModal = signal<boolean>(false);
    usuarioEditando = signal<Usuario | null>(null);


    constructor(private router: Router) {
    this.usersService.getUsuarios().subscribe({
    next: (users) => {
      console.log('USUARIOS =>', users);
      this.users.set(users);
      this.usuariosFiltered.set(users);
      console.log('USUARIOS FILTRADOS =>', users);
      this.usuariosCategory.set(Array.from(
        new Set(users.map((u: Usuario) => u.rol))
      ));
    },
    error: (err) => console.error(err)
    });

    this.maquinaService.getMaquina().subscribe(data => {
      this.datosMaquina.set(data[0]); // Actualizamos el valor del signal
      console.log('Datos de la máquina:', data);
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
            this.usuariosFiltered.set(this.usuariosFiltered().filter(user => user.id !== id));
            this.users.set(this.users().filter(user => user.id !== id));
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            alert('Hubo un error al eliminar el usuario');
          }
        });
      }
    }

    //Abrir modal para modificar usuario
    abrirModalModificar(usuario: Usuario) {
      //Copia para no modificar el original hasta guardar
      this.usuarioEditando.set({...usuario});
      this.mostrarModal.set(true);
      console.log('Editando usuario:', usuario);
    }

    //Cerrar modal
    cerrarModal() {
      this.mostrarModal.set(false);
      this.usuarioEditando.set(null);
    }

    //Guardar cambios del usuario
    guardarCambios() {
      const usuario = this.usuarioEditando();

      if (!usuario) return;

      //Validar si hay campo vacío
      if (!usuario.nombre || !usuario.apellido || !usuario.correoElectronico) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
      }

      //Validar email
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.test(usuario.correoElectronico)) {
        alert('Ingresa un correo electrónico válido');
        return;
      }

      this.usersService.updateUsuario(usuario.id, usuario).subscribe({
        next: (usuarioActualizado) => {
          console.log('Usuario actualizado:', usuarioActualizado);

          //Actualizar lista de usuarios
          this.usuariosFiltered.update((currentUsers) =>
          currentUsers.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
        );

          this.users.update((currentUsers) =>
          currentUsers.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
        );

        alert('Usuario modificado correctamente');
        this.cerrarModal();
        },

        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          alert('Hubo un error al actualizar el usuario');
        },
      });


    }
}
