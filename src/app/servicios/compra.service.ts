import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../models/Compra';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  url = 'http://localhost/Tienda/compra/';
  constructor(private http: HttpClient) {}

  creaCompra(compra: Compra){
    return this.http.post(`${this.url}comprar.php`, JSON.stringify(compra));
  }

  anyadeCarrito(carrito: Carrito){
    return this.http.post(`${this.url}carritoProducto.php`, JSON.stringify(carrito));
  }

  ultimoId(){
    return this.http.get(`${this.url}sacarUltimoId.php`);
  }
}
