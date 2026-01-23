import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { CaracteristicasProducto } from './components/caracteristicas-producto/caracteristicas-producto';
import { Compra } from './components/compra/compra';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { adminGuard, publicGuard, buyGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'caracteristicas', component: CaracteristicasProducto },


    //COMPRA
  {
    path: 'compra',
    component: Compra,
    canActivate: [buyGuard],
  },

  //LOGIN
  {
    path: 'login',
    component: Login,
    canActivate: [publicGuard],
  },

  { path: 'registro', component: Registro },

  // ADMIN
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: '/home' },
];
