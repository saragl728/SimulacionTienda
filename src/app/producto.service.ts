import { Injectable } from '@angular/core';
import { Producto } from './models/Producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost/Tienda/producto/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }

  alta(producto: Producto) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(producto));
  }
  baja(producto: Producto) {
    return this.http.get(`${this.url}baja.php?Id=${producto.Id}`);
  }
  seleccionar(producto: Producto) {
    return this.http.get(`${this.url}seleccionar.php?Id=${producto.Id}`);
  }
  modificacion(producto: Producto) {
    return this.http.post(
      `${this.url}modificacion.php`,
      JSON.stringify(producto)
    );
  }
}
