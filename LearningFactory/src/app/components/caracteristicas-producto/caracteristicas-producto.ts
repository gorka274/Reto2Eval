import { Component, inject, signal } from '@angular/core';
import { Serviciomaquina } from '../../services/serviciomaquina';
import { Maquina } from '../../models/maquina';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-caracteristicas-producto',
  imports: [RouterLink],
  templateUrl: './caracteristicas-producto.html',
  styleUrl: './caracteristicas-producto.scss',
})
export class CaracteristicasProducto {
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
