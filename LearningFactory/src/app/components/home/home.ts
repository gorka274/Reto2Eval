import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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
