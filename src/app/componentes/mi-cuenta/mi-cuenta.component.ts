import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-mi-cuenta',
  imports: [FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  sesionIniciada = false;
  usuarioAdmin = false;
  usuario = "";

  inicioSesion(){
    if (this.usuario.trim()!= "") this.sesionIniciada = true;
  }
}
