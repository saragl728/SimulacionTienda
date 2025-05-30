import { Component } from '@angular/core';
import { ProdCat } from '../../models/ProdCat';
import { Usuario } from '../../models/Usuario';
import { CatProdService } from '../../servicios/cat-prod.service';
import { CategoriaService } from '../../servicios/categoria.service';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nuevo-cat-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-cat-prod.component.html',
  styleUrl: './nuevo-cat-prod.component.css',
})
export class NuevoCatProdComponent extends Sonido {
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private catProdService: CatProdService, private usuarioServicio: UsuarioService, private cookieService: CookieService) {
  super();
  this.recuperaProds();
  this.recuperaCats();
  this.cukiUsuario();
  document.title = $localize`Conectar productos con categorías`;
  }
  //variables que se usarán para ver si se cargan datos para insertar
  productos: any;
  categorias: any;
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};;
  valido: boolean = true;
  sesionIniciada: boolean = false;
  proCat: ProdCat = { IdProd: 0, IdCat: 0 };

  cierraSesion(){
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.proCat = { IdProd: 0, IdCat: 0 };
    this.cookieService.delete('correo');
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
        if (this.persona.adminis == 'S') this.sesionIniciada = true;
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
        this.alertaFallo($localize`Usuario y/o contraseña incorrectos`)
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }  

  validar() {
    this.valido = true;

    let pro = document.getElementById('prodc') as HTMLInputElement;
    let categ = document.getElementById('ctgs') as HTMLInputElement;

    if (!this.proCat.IdProd) {
      pro.classList.add('is-invalid');
      this.valido = false;
    } else pro.classList.remove('is-invalid');

    if (!this.proCat.IdCat) {
      categ.classList.add('is-invalid');
      this.valido = false;
    } else categ.classList.remove('is-invalid');       
  }

  recuperaProds() {
    this.productoService.recuperarTodos().subscribe((respuesta: any) => { this.productos = respuesta; });
  }

  recuperaCats() {
    this.categoriaService.recuperarTodos().subscribe((respuesta: any) => { this.categorias = respuesta; });
  }

  alta() {
    this.validar();

    let pro = document.getElementById('prodc') as HTMLInputElement;
    let categ = document.getElementById('ctgs') as HTMLInputElement;

    pro.classList.remove('is-valid');
    categ.classList.remove('is-valid');

    if (this.valido) {
      this.catProdService.alta(this.proCat).subscribe((datos: any) => {
        if (datos != null) {
          pro.classList.add('is-valid');
          categ.classList.add('is-valid');
          this.suenaGlobo();
        }
        else {
          pro.classList.add('is-invalid');
          categ.classList.add('is-invalid');
          this.suenaError();
        }
      });
    }
    else this.suenaError();
  }
}
