import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdCat } from '../models/ProdCat';

@Injectable({
  providedIn: 'root',
})
export class CatProdService {
  url = 'http://localhost/Tienda/catProd/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }

  recuperaNombres() {
    return this.http.get(`${this.url}recuperaNombres.php`);
  }

  alta(prodCat: ProdCat) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(prodCat));
  }
  baja(prodCat: ProdCat) {
    return this.http.get(`${this.url}baja.php?IdProd=${prodCat.IdProd}&IdCat=${prodCat.IdCat}`);
  }

  recuperaNombresPorCategoria(categoria: string){
    return this.http.get(`${this.url}buscaNombresPorCategoria.php?filtro=${categoria}`);
  }

  recuperaIdsPorCategoria(categoria: string){
    return this.http.get(`${this.url}buscaIdsPorCategoria.php?filtro=${categoria}`);
  }

  recuperaNombresPorProducto(producto: string){
    return this.http.get(`${this.url}buscaNombresPorProducto.php?filtro=${producto}`);
  }

  recuperarIdsPorProducto(producto: string){
    return this.http.get(`${this.url}buscaIdsPorProducto.php?filtro=${producto}`);
  }
}
