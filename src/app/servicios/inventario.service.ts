import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdCant } from '../models/ProdCant';
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
      return this.http.get(`${this.url}cantidadObjetoPersona.php?IdUsuario=${IdUsuario}&IdObjeto=${IdObjeto}`);
    }
}
