import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from '../models/maquina';

@Injectable({
  providedIn: 'root',
})
export class Serviciomaquina {
  private url = 'http://localhost:3000/MK677';

  getMaquina(): Observable<any> {
    return this.http.get(this.url);
  }

  maquina: Maquina = {stock: 0, price: 0};
  constructor(private http: HttpClient) {}

  //Actualizar Stock y Precio de la máquina
  updateStock(id: string, maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.url}/${id}`, maquina);
  }

  // Actualizar solo el stock (mantiene el precio sin cambios)
  updateStockOnly(id: string, stock: number): Observable<Maquina> {
    return this.http.patch<Maquina>(`${this.url}/${id}`, { stock });
  }
}
