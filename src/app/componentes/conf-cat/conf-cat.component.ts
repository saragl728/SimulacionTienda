import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { CategoriaService } from '../../servicios/categoria.service';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-conf-cat',
  imports: [FormsModule],
  templateUrl: './conf-cat.component.html',
  styleUrl: './conf-cat.component.css',
})
export class ConfCatComponent extends Sonido {
  constructor(private categoriaService: CategoriaService, private usuarioServicio: UsuarioService, private cookieService: CookieService) {
  super();
  this.recuperarTodos();
  this.cukiUsuario();
  document.title = $localize`Ver categorías`;
}
  categorias: any;
  temp: Categoria = { Id: 0, nombre: '' };
  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};;
  sesionIniciada: boolean = false;

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.temp = { Id: 0, nombre: '' };
    this.cat = { Id: 0, nombre: '' };
    this.valido = true;
    this.cookieService.delete('correo');
    document.title = $localize`Ver categorías`;
    this.suenaCierre();
  }

  /**
   * Método que inicia sesión si hay una cookie de correo de usuario
   */
  cukiUsuario(){
    let galleta = this.cookieService.get('correo');
    if (galleta.length > 0) {
      this.usuarioServicio.sacaCookie(galleta).subscribe((result: any) => {
        if (result != null) {
        this.persona = result[0];
        this.persona.contrasenya = '';
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
          document.title = $localize`Administrar categorías`;
        }      
        }
      })
    }
  }

  inicioSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;

    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
          document.title = $localize`Administrar categorías`;
          this.cookieService.set('correo', this.persona.correo);
          this.suenaInicio();
        } else {
          this.alertaFallo($localize`No tienes los permisos necesarios`);
          this.persona.contrasenya = '';
          usu.classList.add('is-invalid');
          contr.classList.add('is-invalid');
        }
      } else {
        this.alertaFallo($localize`Usuario y/o contraseña incorrectos`);
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }  

  validar() {
    const longMax: number = 20; //longitud máxima de la categoría
    let nom = document.getElementById('description') as HTMLInputElement;

    if (!this.cat.nombre || this.cat.nombre.length > longMax) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else nom.classList.remove('is-invalid');
  }

  recuperarTodos() {
    this.categoriaService.recuperarTodos().subscribe((respuesta: any) => { this.categorias = respuesta; });
  }

  tempBorr(categoria: Categoria) {
    this.temp = categoria;
  }

  confirmaBorrar() {
    if (this.temp.Id != 0) this.baja(this.temp);
  }

  baja(categoria: Categoria) {
    this.categoriaService.baja(categoria).subscribe((datos: any) => {
      if (datos.resultado != null){
      this.recuperarTodos();
      this.suenaBorra();
      } else this.suenaError();
    });
  }
  
  modificacion() {
    this.validar();

    let nom = document.getElementById('description') as HTMLInputElement;

    nom.classList.remove('is-valid');

    if (this.valido) {
      this.categoriaService.modificacion(this.cat).subscribe((datos: any) => {
        if (datos != null) {
          this.recuperarTodos();
          nom.classList.add('is-valid');
          this.suenaGlobo();
        }
        else {
          nom.classList.add('is-invalid');
          this.suenaError();
        } 
      });
    }
    else this.suenaError();
  }
  seleccionar(categoria: Categoria) {
    this.categoriaService.seleccionar(categoria).subscribe((result: any) => (this.cat = result[0]));
  }
}
