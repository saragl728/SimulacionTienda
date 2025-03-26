import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdCat } from '../models/ProdCat';
import { ProductoCategoria } from '../models/ProductoCategoria';

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
    return this.http.get(
      `${this.url}baja.php?IdProd=${prodCat.IdProd}&IdCat=${prodCat.IdCat}`
    );
  }
}
