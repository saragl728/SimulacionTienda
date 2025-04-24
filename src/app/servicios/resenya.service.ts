import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resenya } from '../models/Resenya';

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
}
