import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'http://localhost/Tienda/usuario/';
  constructor(private http: HttpClient) {}

  anyade(usuario: Usuario) {
    return this.http.post(`${this.url}anyadir.php`, JSON.stringify(usuario));
  }

  baja(usuario: Usuario) {
    return this.http.get(`${this.url}borrar.php?Id=${usuario.Id}`);
  }

  //si da un valor nulo, es que la contraseña no coincide
  entraAdmin(usuario: Usuario){
    return this.http.get(`${this.url}logAdmin.php?nombre=${usuario.nombre}&contrasenya=${usuario.contrasenya}`);
  }

}
