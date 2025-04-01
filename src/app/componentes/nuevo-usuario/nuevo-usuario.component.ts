import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-nuevo-usuario',
  imports: [FormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css',
})
export class NuevoUsuarioComponent {
  constructor(private usuarioServicio: UsuarioService) {}

  confirmado: boolean = false; //se usa para ver si se ha marcado la casilla de verificación
  cont1: string = '';
  cont2: string = '';
  valido: boolean = true;

  //método que se usará para comprobar si la fecha de nacimiento es válida
  validaEdad(fecha: Date): boolean {
    const EDAD_MIN = 13;
    let edadOk: boolean = true;
    let aux: Date = new Date(); //fecha actual
    let ed = aux.getFullYear() - fecha.getFullYear();

    //primero se comprueba si en este año se ha cumplido la edad mímima
    if (ed < EDAD_MIN) {
      edadOk = false;
    } else {
      if ((ed = EDAD_MIN)) {
        //se comprueba si en este mes se ha cumplido la edad mínima
        if (fecha.getMonth() > aux.getMonth()) {
          edadOk = false;
        } else {
          if (
            aux.getMonth() == fecha.getMonth() &&
            fecha.getDate() > aux.getDate()
          )
            edadOk = false;
        }
      }
    }

    return edadOk;
  }

  crearCuenta() {
    this.validar();

    if (this.valido) {
    } else {
    }
  }

  validar() {
    let conf = document.getElementById('acepto') as HTMLInputElement;
    this.valido = true;

    if (!this.confirmado) {
      this.valido = false;
      conf.classList.add('is-invalid');
    } else {
      conf.classList.remove('is-invalid');
    }
  }
}
