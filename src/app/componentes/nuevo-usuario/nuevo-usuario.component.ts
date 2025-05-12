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
  constructor(private usuarioServicio: UsuarioService) {
    document.title = $localize`Crear cuenta`;
  }

  confirmado: boolean = false; //se usa para ver si se ha marcado la casilla de verificación
  cont2: string = '';
  valido: boolean = true;
  auxFecha: string = "";
  ayuda: string = new Date().toLocaleDateString('sv');

  usuario: Usuario = {
    Id: 0,
    nombre: '',
    correo: '',
    fechaNac: '',
    saldo: 150,
    contrasenya: '',
    adminis: 'N',
  };

  //método que se usará para comprobar si la fecha de nacimiento es válida
  validaEdad(): boolean {
    let fecha = new Date(this.auxFecha);
    const EDAD_MIN = 13;
    let edadOk: boolean = true;
    const aux: Date = new Date(); //fecha actual
    let ed = aux.getFullYear() - fecha.getFullYear();
    this.usuario.fechaNac = this.auxFecha;

    //primero se comprueba si en este año se ha cumplido la edad mímima
    if (ed < EDAD_MIN) {
      edadOk = false;
    } else {
      if (ed == EDAD_MIN) {
        //se comprueba si en este mes se ha cumplido la edad mínima
        if (fecha.getMonth() > aux.getMonth()) {
          edadOk = false;
        } else {
          //si se cumple en este mes, se comprueba si ya se ha cumplido
          if (aux.getMonth() == fecha.getMonth() && fecha.getDate() > aux.getDate())
            edadOk = false;
        }
      }
    }

    return edadOk;
  }

  crearCuenta() {
    let nom = document.getElementById('nombre') as HTMLInputElement;
    let cor = document.getElementById('correo') as HTMLInputElement;
    let fec = document.getElementById('fechaNac') as HTMLInputElement;
    let cont1 = document.getElementById('contrasenya') as HTMLInputElement;

    nom.classList.remove('is-valid');
    cor.classList.remove('is-valid');
    fec.classList.remove('is-valid');
    cont1.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
      this.usuarioServicio.anyade(this.usuario).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          console.log('Usuario añadido');

          nom.classList.add('is-valid');
          cor.classList.add('is-valid');
          fec.classList.add('is-valid');
          cont1.classList.add('is-valid');
        } else {
          console.log('No se ha podido añadir el usuario');
        }
      });
    }
  }

  validar() {
    //constantes de longitudes de nombres
    const LONG_NOM = 50;
    const LONG_MAIL = 200;

    //elementos HTML
    let conf = document.getElementById('acepto') as HTMLInputElement;
    let nom = document.getElementById('nombre') as HTMLInputElement;
    let cor = document.getElementById('correo') as HTMLInputElement;
    let fec = document.getElementById('fechaNac') as HTMLInputElement;
    let cont1 = document.getElementById('contrasenya') as HTMLInputElement;
    let contr2 = document.getElementById('contrasenya2') as HTMLInputElement;
    this.valido = true;

    if (!this.confirmado) {
      this.valido = false;
      conf.classList.add('is-invalid');
    } else {
      conf.classList.remove('is-invalid');
    }

    if (!this.usuario.nombre || this.usuario.nombre.length > LONG_NOM) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else {
      nom.classList.remove('is-invalid');
    }

    //usa una expresión regular para ver si se ha metido un correo válido
    if (!this.usuario.correo || this.usuario.correo.length > LONG_MAIL || !this.usuario.correo.match(/@hotmail.|@yahoo.|@gmail./)) {
      cor.classList.add('is-invalid');
      this.valido = false;
    } else {
      cor.classList.remove('is-invalid');
    }

    //hacer que entienda la fecha
    if (!this.validaEdad()) {
      fec.classList.add('is-invalid');
      this.valido = false;
    } else {
      fec.classList.remove('is-invalid');
    }

    if (!this.usuario.contrasenya || this.usuario.contrasenya != this.cont2) {
      cont1.classList.add('is-invalid');
      contr2.classList.add('is-invalid');
      this.valido = false;
    } else {
      cont1.classList.remove('is-invalid');
      contr2.classList.remove('is-invalid');
    }
  }
}
