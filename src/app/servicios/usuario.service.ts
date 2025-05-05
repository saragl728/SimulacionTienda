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

  sacarTodosExceptoActual(id: number){
    return this.http.get(`${this.url}sacarTodosMenosUsuario.php?Id=${id}`);
  }

  baja(usuario: Usuario) {
    return this.http.get(`${this.url}borrar.php?Id=${usuario.Id}`);
  }

  cambiaPasswd(usuario: Usuario){
    return this.http.post(`${this.url}cambiaContrasenya.php`, JSON.stringify(usuario));
  }

  cambiaAdmin(usuario: Usuario){
    return this.http.post(`${this.url}cambiaAdmin.php`, JSON.stringify(usuario));
  }

  cambiaNombre(usuario: Usuario){
    return this.http.post(`${this.url}cambiaNombre.php`, JSON.stringify(usuario));
  }

  actualizaSaldo(usuario: Usuario){
    return this.http.post(`${this.url}cambiaSaldo.php`, JSON.stringify(usuario));
  }

  //si da un valor nulo, es que la contraseña no coincide
  entraAdmin(usuario: Usuario){
    return this.http.get(`${this.url}logAdmin.php?nombre=${usuario.nombre}&contrasenya=${usuario.contrasenya}`);
  }

  entraNormal(usuario: Usuario){
    return this.http.get(`${this.url}selectPorNombre.php?nombre=${usuario.nombre}&contrasenya=${usuario.contrasenya}`);
  }

}
