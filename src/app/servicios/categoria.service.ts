import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url = 'http://localhost/Tienda/categoria/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }

  alta(categoria: Categoria) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(categoria));
  }
  baja(categoria: Categoria) {
    return this.http.get(`${this.url}baja.php?Id=${categoria.Id}`);
  }
  seleccionar(categoria: Categoria) {
    return this.http.get(`${this.url}seleccionar.php?Id=${categoria.Id}`);
  }
  modificacion(categoria: Categoria) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(categoria));
  }
}
