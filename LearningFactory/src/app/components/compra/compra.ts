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
  private maquinaService = inject(Serviciomaquina);

  // Usamos un Signal para manejar el estado de forma reactiva
  datosMaquina = signal<Maquina | null>(null);

  constructor() {
    this.maquinaService.getMaquina().subscribe(data => {
      this.datosMaquina.set(data[0]); // Actualizamos el valor del signal
      console.log('Datos de la máquina:', data);
    });
  }

}
