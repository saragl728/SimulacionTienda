import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { ProdCant } from '../../models/ProdCant';
import { InventarioService } from '../../servicios/inventario.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ResenyaService } from '../../servicios/resenya.service';

@Component({
  selector: 'app-mi-cuenta',
  imports: [FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  constructor(private usuarioServicio: UsuarioService, private inventarioServicio: InventarioService, private resenyaServicio: ResenyaService) {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  }
  sesionIniciada = false;
  usuarioAdmin = false;
  usuario = "";
  persona: Usuario;
  contr2 = "";
  inventario: Array<ProdCant> = [];
  misReses: Array<any> = [];

  esAdulto(): boolean{
    //hacer algo parecido a la validación de 13 años
    const ADULTO = 18;
    let edadAdulto: boolean = true;
    let fe = new Date(this.persona.fechaNac);
    const aux: Date = new Date(); //fecha actual

    let ed = aux.getFullYear() - fe.getFullYear();

    if (ed < ADULTO) {
      edadAdulto = false;
    } else {
      if (ed == ADULTO) {
        //se comprueba si en este mes se ha cumplido la edad mínima
        if (fe.getMonth() > aux.getMonth()) {
          edadAdulto = false;
        } else {
          //si se cumple en este mes, se comprueba si ya se ha cumplido
          if (aux.getMonth() == fe.getMonth() && fe.getDate() > aux.getDate())
            edadAdulto = false;
        }
      }
    }

    return edadAdulto;
  }

  inicioSesion() {
    this.usuarioServicio.entraNormal(this.persona).subscribe((result: any) => {      
      if (result != null && result.length > 0){
        this.persona = result[0];
        if (this.persona.adminis != ""){
          this.sesionIniciada = true;
          this.persona.contrasenya = "";  //la pongo a cadena vacía para que en la sección de modificación no salga la ristra
          //ahora busco el inventario
          this.inventarioServicio.productosDeUsuario(this.persona.Id).subscribe((resultado: any) => {
            this.inventario = resultado;
            console.log(this.inventario);
          });
          this.resenyaServicio.resenyaPorPersona(this.persona).subscribe((resu: any) => {
            this.misReses = resu;
          });
        } 
    }
  });    
  }

  cambiarContrasenya(){
    let valido: boolean = true;

    let con1 = document.getElementById('contrasenya') as HTMLInputElement;
    let con2 = document.getElementById('contrasenya2') as HTMLInputElement;

    
    if (!this.persona.contrasenya || this.persona.contrasenya != this.contr2) {
      con1.classList.add('is-invalid');
      con2.classList.add('is-invalid');
      valido = false;
    } else {
      con1.classList.remove('is-invalid');
      con2.classList.remove('is-invalid');
    }

    if (valido){
      this.usuarioServicio.cambiaNombre(this.persona).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          con1.classList.add('is-valid');
          con2.classList.add('is-valid');
        }
      });
    }
  }

  cambiarNombre(){
    let valido: boolean = true;
    const LONG_NOM = 50;
    let nom = document.getElementById('nombre') as HTMLInputElement;
    nom.classList.remove('is-valid');

    if (!this.persona.nombre || this.persona.nombre.length > LONG_NOM) {
      nom.classList.add('is-invalid');
      valido = false;
    } else {
      nom.classList.remove('is-invalid');
    }

    if (valido){
      //si el nombre está bien, hace la actualización
      this.usuarioServicio.cambiaNombre(this.persona).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          nom.classList.add('is-valid');
        }
      });
    }
  }
}
