import { Component, inject, signal } from '@angular/core';
import { Serviciomaquina } from '../../services/serviciomaquina';
import { Maquina } from '../../models/maquina';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra',
  imports: [],
  templateUrl: './compra.html',
  styleUrl: './compra.scss',
})
export class Compra {
  private servicio = inject(Serviciomaquina);

  // Usamos un Signal para manejar el estado de forma reactiva
  datosMaquina!: Maquina;

  constructor() {
    this.servicio.getMaquina().subscribe(data => {
      this.datosMaquina = data.maquina; // Actualizamos el valor del signal
      console.log('Datos de la máquina:', data);
    });
  }

}
