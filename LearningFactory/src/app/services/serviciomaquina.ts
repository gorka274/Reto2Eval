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
}
