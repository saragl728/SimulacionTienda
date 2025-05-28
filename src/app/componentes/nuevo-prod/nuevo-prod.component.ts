import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { Usuario } from '../../models/Usuario';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nuevo-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-prod.component.html',
  styleUrl: './nuevo-prod.component.css',
})
export class NuevoProdComponent extends Sonido {
  constructor(private productoServicio: ProductoService, private usuarioServicio: UsuarioService, private cookieService: CookieService) {
    super();
    this.obtenerNombres();
    this.numAdmins();
    this.cukiUsuario();
    document.title = $localize`Nuevo producto`;
  }
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};;
  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;
  sesionIniciada: boolean = false;
  nombres: Array<any> = []; //array con los nombres de los productos, se usará para que el usuario tenga claro qué nombres no se pueden meter
  nAdmins: number = 0;

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.prod = { Id: 0, nombre: '', precio: 0 };
    this.cookieService.delete('correo');
    this.suenaCierre();
  }

  /**
   * Método que inicia sesión si hay una cookie de correo de usuario
   */
  cukiUsuario() {
    let galleta = this.cookieService.get('correo');
    if (galleta.length > 0) {
      this.usuarioServicio.sacaCookie(galleta).subscribe((result: any) => {
        if (result != null) {
        this.persona = result[0];
        this.persona.contrasenya = '';
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
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

  /**
   * Se usa para ver si hay administradores que puedan hacer algo
   */
  numAdmins() {
    this.usuarioServicio.numeroAdmins().subscribe((result: any) => {
      if (result != null) this.nAdmins = result[0].cantidad;
    })
  }

  /**
   * Para obtener los nombres de productos que hay para que el usuario no intente usarlos de nuevo
   */
  obtenerNombres() {
    this.productoServicio.obtenerNombres().subscribe((result: any) => {
      for (let i = 0; i < result.length; i++){
        this.nombres.push(result[i].nombre)
      }
    });
  }

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //comprobación del nombre
    if (!this.prod.nombre || this.prod.nombre.length > longMax || this.nombres.includes(this.prod.nombre)) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else nom.classList.remove('is-invalid');

    if (!this.prod.precio || this.prod.precio <= 0) {
      prc.classList.add('is-invalid');
      this.valido = false;
    } else prc.classList.remove('is-invalid');
  }

  alta() {
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
      this.productoServicio.alta(this.prod).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          this.suenaGlobo();
          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
          this.obtenerNombres();
        }
      });
    }
    else this.suenaError();
  }
}
