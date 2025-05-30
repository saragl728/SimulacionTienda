import { Component } from '@angular/core';
import { ProdCat } from '../../models/ProdCat';
import { Usuario } from '../../models/Usuario';
import { ProductoCategoria } from '../../models/ProductoCategoria';
import { CatProdService } from '../../servicios/cat-prod.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { Sonido } from '../../models/Sonido';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-conf-cat-prod',
  imports: [FormsModule],
  templateUrl: './conf-cat-prod.component.html',
  styleUrl: './conf-cat-prod.component.css',
})
export class ConfCatProdComponent extends Sonido {
  constructor(private proCatService: CatProdService, private usuarioServicio: UsuarioService, private cookieService: CookieService) {
  super();
  this.muestraTodo();
  this.cukiUsuario();
  document.title = $localize`Ver productos con categorías`;
  }
  prodCats: any; //ids conectados
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};;
  filtroElegido: string = ""; //se usará para la búsqueda
  filtrio: string = "";  //lo que hay en la barra de búsqueda
  nombres: any; //resultado de la consulta con join
  temp: ProdCat = { IdProd: 0, IdCat: 0 }; //variable temporal para cuando tengamos que borrar
  auxNombres: ProductoCategoria = { producto: '', categoria: '' };
  sesionIniciada: boolean = false;

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.filtroElegido = "";
    this.filtrio = ""
    this.temp = { IdProd: 0, IdCat: 0 };
    this.auxNombres = { producto: '', categoria: '' };
    this.cookieService.delete('correo');
    document.title = $localize`Ver productos con categorías`;
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
          document.title = $localize`Administrar conexiones de productos con categorías`;
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
          this.suenaInicio();
          this.cookieService.set('correo', this.persona.correo);
          document.title = $localize`Administrar conexiones de productos con categorías`;
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

  muestraTodo() {
    this.recuperarTodos();
    this.recuperaNombres();
    this.filtroElegido = "";
    this.filtrio = "";
  }

  recuperarIdsPorCategoria(cat: string) {
  this.proCatService.recuperaIdsPorCategoria(cat).subscribe((respuesta: any) => { this.prodCats = respuesta; });
}

  recuperaNombresPorCategoria(cat: string) {
  this.proCatService.recuperaNombresPorCategoria(cat).subscribe((respuesta: any) => { this.nombres = respuesta; });
}


  recuperarIdsPorProducto(pro: string) {
  this.proCatService.recuperarIdsPorProducto(pro).subscribe((respuesta: any) => { this.prodCats = respuesta; });
}

  recuperaNombresPorProducto(pro: string) {
  this.proCatService.recuperaNombresPorProducto(pro).subscribe((respuesta: any) => { this.nombres = respuesta; });
}

  buscarPorProducto(filtro: string) {
    this.recuperarIdsPorProducto(filtro);
    this.recuperaNombresPorProducto(filtro);
  }

  buscarPorCategoria(filtro: string) {
    this.recuperarIdsPorCategoria(filtro);
    this.recuperaNombresPorCategoria(filtro);
  }

  busca() {
    switch(this.filtroElegido){
      case "produc":
        this.buscarPorProducto(this.filtrio);
        break;
      case "categ":
        this.buscarPorCategoria(this.filtrio);
        break;
      default:
        break;
    }

  }

  recuperarTodos() {
    this.proCatService.recuperarTodos().subscribe((respuesta: any) => { this.prodCats = respuesta; });
  }

  recuperaNombres() {
    this.proCatService.recuperaNombres().subscribe((respuesta: any) => { this.nombres = respuesta; });
  }

  tempBorr(pr: number, cat: number, pC: ProductoCategoria) {
    this.temp = new ProdCat(pr, cat);
    this.auxNombres = pC;
  }

  confirmaBorrar() {
    if (this.temp.IdProd != 0 && this.temp.IdCat != 0) this.baja(this.temp);
  }

  baja(prCt: ProdCat) {
    this.proCatService.baja(prCt).subscribe((datos: any) => {
      if (datos.resultado == 'OK'){
        //pongo esto para que no reinicie la búsqueda
            switch (this.filtroElegido) {
              case 'produc':
                this.buscarPorProducto(this.filtrio);
                break;
              case 'categ':
                this.buscarPorCategoria(this.filtrio);
                break;
              default:
                this.muestraTodo();
                break;
            }
            this.suenaBorra();
      } 
    });
  }
}
