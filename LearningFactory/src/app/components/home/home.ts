import { Component, input, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'; //SEO


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  constructor(
    private titleService: Title, 
    private metaService: Meta
  ) {}

   ngOnInit(): void {
    //Titulo de la página
    this.titleService.setTitle('Reciclaje de Plásticos y Economía Circular | LearningFactory');

    //Etiquetas
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Transformamos residuos plásticos en recursos valiosos mediante tecnología innovadora para combatir la acumulación de desechos y proteger la capa de ozono.' 
    });

    this.metaService.updateTag({ name: 'keywords', content: 'reciclaje plástico, economía circular, medio ambiente, gestión de residuos, sostenibilidad' });

    this.metaService.updateTag({ property: 'og:title', content: 'Líderes en Reciclaje y Transformación de Plástico' });
    this.metaService.updateTag({ property: 'og:description', content: 'Soluciones tecnológicas para el tratamiento de residuos y la protección del planeta.' });
  }

  
  slides = [
    {
      title: 'LEARNING FACTORY',
      text: 'Dale una segunda oportunidad al plástico. Recicla.',
      image: 'img/RecycleC1.jpeg',
    },
    {
      title: 'ECOLOGIA',
      text: 'Creamos productos responsables con el planeta.',
      image: 'img/recyclingC2.jpg',
    },
    {
      title: 'SOSTENIBILIDAD',
      text: 'El futuro empieza con pequeñas acciones.',
      image: 'img/man-recycleC3.jpg',
    },
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
