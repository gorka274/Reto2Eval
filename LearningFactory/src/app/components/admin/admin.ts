import { Usuario } from '../../models/usuarios';
import { Component, inject, signal } from '@angular/core';
import { Serviciousuario } from '../../services/serviciousuario';
import { Router } from '@angular/router';
import { Maquina } from '../../models/maquina';
import { Serviciomaquina } from '../../services/serviciomaquina';

@Component({
  selector: 'app-admin',
  imports: [],
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
  } */

  private usersService = inject(Serviciousuario);

    users = signal<Usuario[]>([]);
    usuariosCategory = signal<string[]>([]);

    usuariosFiltered = signal<Usuario[]>([]);

    index = signal<number>(0);


    private maquinaService = inject(Serviciomaquina);

    // Usamos un Signal para manejar el estado de forma reactiva
    datosMaquina = signal<Maquina | null>(null);


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


}
