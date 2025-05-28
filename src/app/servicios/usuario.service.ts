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

  numeroAdmins() {
    return this.http.get(`${this.url}numeroAdmins.php`);
  }

  numeroUsuarios() {
    return this.http.get(`${this.url}numeroUsuarios.php`);
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

  iniSesion(usuario: Usuario){
    return this.http.post(`${this.url}iniSesion.php`, JSON.stringify(usuario));
  }

  datosComprasUsuarios(id: number){
    return this.http.get(`${this.url}datosComprasUsuario.php?Id=${id}`);
  }

  sacaCookie(correo: string){
    return this.http.get(`${this.url}cukiUsuario.php?correo=${correo}`);
  }

}
