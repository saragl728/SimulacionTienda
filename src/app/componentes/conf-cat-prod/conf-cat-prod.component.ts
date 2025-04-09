import { Component } from '@angular/core';
import { ProdCat } from '../../models/ProdCat';
import { ProductoCategoria } from '../../models/ProductoCategoria';
import { SesionAdmin } from '../../models/SesionAdmin';
import { CatProdService } from '../../servicios/cat-prod.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conf-cat-prod',
  imports: [FormsModule],
  templateUrl: './conf-cat-prod.component.html',
  styleUrl: './conf-cat-prod.component.css',
})
export class ConfCatProdComponent extends SesionAdmin {
  prodCats: any; //ids conectados
  filtroElegido: string = ""; //se usará para la búsqueda
  filtrio: string = "";  //lo que hay en la barra de búsqueda
  nombres: any; //resultado de la consulta con join
  temp: ProdCat = { IdProd: 0, IdCat: 0 }; //variable temporal para cuando tengamos que borrar
  auxNombres: ProductoCategoria = { producto: '', categoria: '' };

  constructor(private proCatService: CatProdService, private usuarioServicio: UsuarioService) {
    super();
    this.muestraTodo();
  }

  override inicioSesion(): void {
    this.usuarioServicio.entraAdmin(this.persona).subscribe((result: any) => {      
        if (result != null && result.length > 0){
          this.aiuda = result[0].adminis;
          if (this.aiuda == 'S') {
            this.sesionIniciada = true;
          }
      }
    });    
  }

  muestraTodo() {
    this.recuperarTodos();
    this.recuperaNombres();
  }

  recuperarIdsPorCategoria(cat: string) {
  	this.proCatService.recuperaIdsPorCategoria(cat).subscribe((respuesta: any) => {
    this.prodCats = respuesta;
  });
}

  recuperaNombresPorCategoria(cat: string) {
  this.proCatService.recuperaNombresPorCategoria(cat).subscribe((respuesta: any) => {
    this.nombres = respuesta;
  });
}


  recuperarIdsPorProducto(pro: string) {
  	this.proCatService.recuperarIdsPorProducto(pro).subscribe((respuesta: any) => {
    this.prodCats = respuesta;
  });
}

  recuperaNombresPorProducto(pro: string) {
  this.proCatService.recuperaNombresPorProducto(pro).subscribe((respuesta: any) => {
    this.nombres = respuesta;
  });
}

  buscarPorProducto(filtro: string){
    this.recuperarIdsPorProducto(filtro);
    this.recuperaNombresPorProducto(filtro);
  }

  buscarPorCategoria(filtro: string){
    this.recuperarIdsPorCategoria(filtro);
    this.recuperaNombresPorCategoria(filtro);
  }

  busca(){
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
    this.proCatService.recuperarTodos().subscribe((respuesta: any) => {
      this.prodCats = respuesta;
    });
  }

  recuperaNombres() {
    this.proCatService.recuperaNombres().subscribe((respuesta: any) => {
      this.nombres = respuesta;
    });
  }

  tempBorr(pr: number, cat: number, pC: ProductoCategoria) {
    this.temp = new ProdCat(pr, cat);
    this.auxNombres = pC;
  }

  confirmaBorrar() {
    if (this.temp.IdProd != 0 && this.temp.IdCat != 0) {
      this.baja(this.temp);
    }
  }

  baja(prCt: ProdCat) {
    this.proCatService.baja(prCt).subscribe((datos: any) => {
      if (datos.resultado == 'OK') {
        this.muestraTodo();
      }
    });
  }
}
