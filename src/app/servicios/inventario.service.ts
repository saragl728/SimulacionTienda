import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../models/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

    url = 'http://localhost/Tienda/inventario/';
    constructor(private http: HttpClient) {}

    productosDeUsuario(IdPer: number){
      return this.http.get(`${this.url}inventarioDePersona.php?IdPer=${IdPer}`);
    }

    cantidadInventario(IdUsuario: number, IdObjeto: number){
      return this.http.get(`${this.url}cantidadObjetoPersona.php?IdUsuario=${IdUsuario}&IdProducto=${IdObjeto}`);
    }

    anyadeInventario(inv: Inventario){
      return this.http.post(`${this.url}anyadir.php`, JSON.stringify(inv));
    }

    actualizaInventario(inv: Inventario){
      return this.http.post(`${this.url}actualizarCantidad.php`, JSON.stringify(inv));
    }
}
