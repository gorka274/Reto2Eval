import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import {CaracteristicasProducto} from "./components/caracteristicas-producto/caracteristicas-producto";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar,CaracteristicasProducto],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LearningFactory');
}
