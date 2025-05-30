import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProductoService } from '../../servicios/producto.service';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-conf-prod',
  imports: [FormsModule],
  templateUrl: './conf-prod.component.html',
  styleUrl: './conf-prod.component.css',
})

export class ConfProdComponent extends Sonido {
  constructor(private productoService: ProductoService, private usuarioServicio: UsuarioService, private cookieService: CookieService) {
  super();
  this.cukiUsuario();
  this.recuperarTodos();
  document.title = $localize`Ver productos`;
  }
  productos: any;
  temp: Producto = { Id: 0, nombre: '', precio: 0 }; //variable temporal para cuando tengamos que borrar
  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  sesionIniciada: boolean = false;
  valido: boolean = true;
  busca: string = "";

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.temp = { Id: 0, nombre: '', precio: 0 };
    this.prod = { Id: 0, nombre: '', precio: 0 };
    this.valido = true;
    this.cookieService.delete('correo');
    document.title = $localize`Ver productos`;
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
          document.title = $localize`Administrar productos`;
        }      
        }
      })
    }
  }

  buscaPorNombre() {
    this.productoService.buscaPorNombre(this.busca).subscribe((result: any) => (this.productos = result));
  }

  inicioSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;
    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
          this.cookieService.set('correo', this.persona.correo);
          this.suenaInicio();
          document.title = $localize`Administrar productos`;
        } else {
          this.alertaFallo($localize`No tienes los permisos necesarios`);
          this.persona.contrasenya = '';
          usu.classList.add('is-invalid');
          contr.classList.add('is-invalid');
        }
      } else {
        this.alertaFallo($localize`Usuario y/o contraseña incorrectos`);
        alert($localize`Usuario y/o contraseña incorrectos`);
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }  

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //compruebo la longitud del nombre y si existe el nombre
    if (!this.prod.nombre || this.prod.nombre.length > longMax) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else nom.classList.remove('is-invalid');
    

    if (!this.prod.precio || this.prod.precio <= 0) {
      prc.classList.add('is-invalid');
      this.valido = false;
    } else prc.classList.remove('is-invalid');
          
  }

  recuperarTodos() {
    this.productoService.recuperarTodos().subscribe((respuesta: any) => { this.productos = respuesta; });
  }

  tempBorr(producto: Producto) {
    this.temp = producto;
  }

  confirmaBorrar() {
    //comprueba el código, si es diferente al original, es que se ha seleccionado un artículo
    if (this.temp.Id != 0) this.baja(this.temp);
  }

  baja(producto: Producto) {
    this.productoService.baja(producto).subscribe((datos: any) => {
      if (datos != null){
        this.suenaBorra();
        this.recuperarTodos();
      } else this.suenaError();
    });
  }

  modificacion() {
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
      this.productoService.modificacion(this.prod).subscribe((datos: any) => {
        if (datos != null) {
          this.recuperarTodos();
          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
          this.suenaGlobo();
        }
        else {
          nom.classList.add('is-invalid');
          prc.classList.add('is-invalid');
          this.suenaError();
        }
      }
    );
    } else this.suenaError();
  }
  seleccionar(producto: Producto) {
    this.productoService.seleccionar(producto).subscribe((result: any) => (this.prod = result[0]));
  }
}
