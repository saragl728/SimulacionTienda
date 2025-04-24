import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resenya } from '../models/Resenya';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ResenyaService {

    url = 'http://localhost/Tienda/resenya/';
  
    constructor(private http: HttpClient) {}

    anyadir(resenya: Resenya){
      return this.http.post(`${this.url}anyadir.php`, JSON.stringify(resenya));
    }

    mostrarTodas(){
      return this.http.get(`${this.url}mostrarTodo.php`);
    }

    resenyaPorPersona(persona: Usuario){
      return this.http.get(`${this.url}resenyasDeUnaPersona.php?IdCliente=${persona.Id}`);
    }
}
