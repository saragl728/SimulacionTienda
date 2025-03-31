import { Component } from '@angular/core';
import { ProdCat } from '../../models/ProdCat';
import { SesionAdmin } from '../../models/SesionAdmin';
import { CatProdService } from '../../servicios/cat-prod.service';
import { CategoriaService } from '../../servicios/categoria.service';
import { ProductoService } from '../../servicios/producto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-cat-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-cat-prod.component.html',
  styleUrl: './nuevo-cat-prod.component.css',
})
export class NuevoCatProdComponent extends SesionAdmin {
  //variables que se usarán para ver si se cargan datos para insertar
  productos: any;
  categorias: any;
  valido: boolean = true;
  proCat: ProdCat = { IdProd: 0, IdCat: 0 };

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private catProdService: CatProdService) {
    super();
    this.recuperaProds();
    this.recuperaCats();
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
    this.productoService.recuperarTodos().subscribe((respuesta: any) => {
      this.productos = respuesta;
    });
  }

  recuperaCats() {
    this.categoriaService.recuperarTodos().subscribe((respuesta: any) => {
      this.categorias = respuesta;
    });
  }

  alta() {
    this.validar();

    let pro = document.getElementById('prodc') as HTMLInputElement;
    let categ = document.getElementById('ctgs') as HTMLInputElement;

    pro.classList.remove('is-valid');
    categ.classList.remove('is-valid');

    if (this.valido) {
      this.catProdService.alta(this.proCat).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          console.log('Conexión añadida');
          pro.classList.add('is-valid');
          categ.classList.add('is-valid');
        }
      });
    }
  }
}
