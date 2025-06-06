import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResenyaService } from '../../servicios/resenya.service';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Resenya } from '../../models/Resenya';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resenya',
  imports: [FormsModule],
  templateUrl: './resenya.component.html',
  styleUrl: './resenya.component.css'
})
export class ResenyaComponent extends Sonido {
  constructor(private resenyaServicio: ResenyaService, private usuarioServicio: UsuarioService, private productoService: ProductoService, private cookieService: CookieService){
    super();
    this.sacarTodas();
    this.recuperaProds();
    this.cukiUsuario();
    document.title = $localize`Reseñas`;
  }
  resenyas: any;
  productos: any;
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};;
  rese: Resenya = { Id: 0, IdProducto: 0, IdCliente: 0, contenido: '', fecha: ''};;
  sesionIniciada: boolean = false;
  valido: boolean = true;
  filtro: string = "";

  /**
   * Método que inicia sesión si hay una cookie de correo de usuario
   */
  cukiUsuario(){
    let galleta = this.cookieService.get('correo');
    if (galleta.length > 0) {
      this.usuarioServicio.sacaCookie(galleta).subscribe((result: any) => {
        if (result != null) {
        this.persona = result[0];
        this.persona.contrasenya = ''; //la pongo a cadena vacía para que en la sección de modificación no salga la ristra
        this.sesionIniciada = true;  
        }
      })
    }
  }

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.rese = { Id: 0, IdProducto: 0, IdCliente: 0, contenido: '', fecha: ''};
    this.sesionIniciada = false;
    this.cookieService.delete('correo');
    this.suenaCierre();
  }

  sacarTodas() {
    this.resenyaServicio.mostrarTodas().subscribe((respuesta: any) => { this.resenyas = respuesta; });
  }

  buscarPorNombreProducto() {
    this.resenyaServicio.resenyaPorNombre(this.filtro).subscribe((respuesta: any) => { this.resenyas = respuesta; });
  }

  recuperaProds() {
    this.productoService.recuperarTodos().subscribe((respuesta: any) => { this.productos = respuesta; });
  }

  iniciarSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;

    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        this.persona.contrasenya = '';
        this.sesionIniciada = true;
        this.cookieService.set('correo', this.persona.correo);
        this.suenaInicio();
      } else {
        this.alertaFallo($localize`Usuario y/o contraseña incorrectos`);
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }

  validar() {
    this.valido = true;
    const LONG_MAX = 200;

    let opi = document.getElementById('areaOp') as HTMLInputElement;
    let pro = document.getElementById('prodc') as HTMLInputElement;

    if (!this.rese.IdProducto) {
      pro.classList.add('is-invalid');
      this.valido = false;
    } else pro.classList.remove('is-invalid');

    if (!this.rese.contenido || this.rese.contenido.length > LONG_MAX) {
      opi.classList.add('is-invalid');
      this.valido = false;
    } else opi.classList.remove('is-invalid');
  }

  anyadirResenya() {
    let opi = document.getElementById('areaOp') as HTMLInputElement;
    let pro = document.getElementById('prodc') as HTMLInputElement;

    opi.classList.remove('is-valid');
    pro.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
    this.rese.IdCliente = this.persona.Id;
        this.resenyaServicio.anyadir(this.rese).subscribe((datos: any) => {
      if (datos.resultado == 'OK') {
        this.sacarTodas();  //si funciona, hace que cargue las reseñas
        opi.classList.add('is-valid');
        pro.classList.add('is-valid');
        this.suenaGlobo();
      }
    });
    }
    else this.suenaError();
  }
}
