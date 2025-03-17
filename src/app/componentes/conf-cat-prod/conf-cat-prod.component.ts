import { Component } from '@angular/core';
import { ProdCat } from '../../models/ProdCat';
import { ProductoCategoria } from '../../models/ProductoCategoria';
import { CatProdService } from '../../servicios/cat-prod.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conf-cat-prod',
  imports: [FormsModule],
  templateUrl: './conf-cat-prod.component.html',
  styleUrl: './conf-cat-prod.component.css',
})
export class ConfCatProdComponent {
  prodCats: any; //ids conectados
  nombres: any; //resultado de la consulta con join
  temp: ProdCat = { IdProd: 0, IdCat: 0 }; //variable temporal para cuando tengamos que borrar
  auxNombres: ProductoCategoria = { producto: '', categoria: '' };
  constructor(private proCatService: CatProdService) {
    this.muestraTodo();
  }

  muestraTodo() {
    this.recuperarTodos();
    this.recuperaNombres();
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
      if (datos['resultado'] == 'OK') {
        this.muestraTodo();
      }
    });
  }
}
