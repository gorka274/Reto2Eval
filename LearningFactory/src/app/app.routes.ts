import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { CaracteristicasProducto } from './components/caracteristicas-producto/caracteristicas-producto';
import { Compra } from './components/compra/compra';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Home},
  { path: 'caracteristicas', component: CaracteristicasProducto},
  { path: 'compra', component: Compra},
  { path: 'login', component: Login},
  { path: 'registro', component: Registro},
  { path: 'admin', component: Admin},
  { path: '**', redirectTo: '/home' }
];
