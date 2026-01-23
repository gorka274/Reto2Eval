import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth';

// GUARDIA 1: Para proteger la zona de /admin
export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaLogueado() && authService.esAdmin()) {
    return true;
  } else {
    alert('Acceso denegado: Se requieren permisos de administrador.');
    return router.parseUrl('/home');
  }
};

// GUARDIA 2: Para proteger la zona de /compra de usuarios que no estan loggeados
export const buyGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaLogueado()) {
    return true;
  } else {
    alert('Acceso denegado: Se requiere estar loggeado');
    return router.parseUrl('/login');
  }
};

export const publicGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaLogueado()) {
    alert('Acción no permitida: Ya tienes una sesión activa.');

    if (authService.esAdmin()) {
      return router.parseUrl('/admin');
    } else {
      return router.parseUrl('/home');
    }
  }

  return true;
};
