import { Component, inject, signal } from '@angular/core';
import { Serviciomaquina } from '../../services/serviciomaquina';
import { Maquina } from '../../models/maquina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compra',
  imports: [FormsModule],
  templateUrl: './compra.html',
  styleUrl: './compra.scss',
})
export class Compra {
  private maquinaService = inject(Serviciomaquina);

  // Usamos un Signal para manejar el estado de forma reactiva
  datosMaquina = signal<Maquina | null>(null);
  cantidad = signal<number>(1);

  constructor() {
    this.maquinaService.getMaquina().subscribe(data => {
      this.datosMaquina.set(data[0]);
      console.log('Datos de la máquina:', data);
    });
  }

  // Función para calcular el precio total
  calcularPrecioTotal(): number {
    const precio = this.datosMaquina()?.price || 0;
    if (this.cantidad() > 0) {
      return precio * this.cantidad();
    } else {
      return 0;
    }
  }

  // Función para procesar la compra
  realizarCompra() {
    const maquina = this.datosMaquina();
    if (!maquina) {
      alert('Error: No se pudieron cargar los datos de la máquina');
      return;
    }

    const cantidadCompra = this.cantidad();

    // Validar que hay stock suficiente
    if (maquina.stock < cantidadCompra) {
      alert('Stock insuficiente.');
      return;
    }

    if (cantidadCompra < 0) {
      alert('Error. Ese numero es negativo');
      return;
    }

    // Calcular nuevo stock
    const nuevoStock = maquina.stock - cantidadCompra;

    // Actualizar solo el stock (sin tocar el precio)
    this.maquinaService.updateStockOnly('18b2', nuevoStock).subscribe({
      next: (resultado) => {
        console.log('Stock actualizado:', resultado);
        this.datosMaquina.set(resultado);
        alert('¡Compra realizada con éxito!');
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        alert('Error al procesar la compra');
      },
    });
  }
}
