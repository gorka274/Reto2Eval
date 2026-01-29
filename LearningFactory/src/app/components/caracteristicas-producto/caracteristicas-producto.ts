import { Component, inject, signal, OnInit } from '@angular/core';
import { Serviciomaquina } from '../../services/serviciomaquina';
import { Maquina } from '../../models/maquina';
import { RouterLink } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser'; //SEO

@Component({
  selector: 'app-caracteristicas-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './caracteristicas-producto.html',
  styleUrl: './caracteristicas-producto.scss',
})
export class CaracteristicasProducto implements OnInit {
  private servicio = inject(Serviciomaquina);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  //Usamos un Signal
  datosMaquina = signal<Maquina | null>(null);

  constructor() {
    this.servicio.getMaquina().subscribe(data => {
      const maquina = data[0];
      this.datosMaquina.set(data[0]); // Actualizamos el valor del signal
      console.log('Datos de la máquina:', data);

      if (maquina) {
        this.actualizarSEO(maquina);
      }
      
    });
  }


  ngOnInit(): void {
    this.titleService.setTitle('Características de la Máquina MK677');
  }

  private actualizarSEO(maquina: any) {
    //Titulo con el precio
    this.titleService.setTitle(`Máquina MK677 - Comprar por ${maquina.price}€ | LearningFactory`);

    //Descripción que incluye disponibilidad real del stock
    this.metaService.updateTag({ 
      name: 'description', 
      content: `Adquiere la MK677 por solo ${maquina.price}€. Actualmente contamos con ${maquina.stock} unidades en stock. La mejor tecnología en reciclaje de plástico.` 
    });

    //Keywords específicas
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: `MK677 precio, comprar trituradora plástico, maquinaria reciclaje ${maquina.price} euros` 
    });

    //Redes Sociales
    this.metaService.updateTag({ property: 'og:price:amount', content: maquina.price.toString() });
    this.metaService.updateTag({ property: 'og:price:currency', content: 'EUR' });
    this.metaService.updateTag({ 
      property: 'og:description', 
      content: `¡Oferta disponible! MK677 a ${maquina.price}€. Unidades disponibles: ${maquina.stock}.` 
    });
  }

  
}
