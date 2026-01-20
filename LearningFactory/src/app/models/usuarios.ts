export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  telefono: string;
  password: string;
  rol: Rol;
}

export enum Rol {
  USER = 'user',
  ADMIN = 'admin'
}
