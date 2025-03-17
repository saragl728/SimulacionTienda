import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../producto.service';

@Component({
  selector: 'app-conf-prod',
  imports: [FormsModule],
  templateUrl: './conf-prod.component.html',
  styleUrl: './conf-prod.component.css',
})
export class ConfProdComponent {
  productos: any;
  temp: Producto = { Id: 0, nombre: '', precio: 0 }; //variable temporal para cuando tengamos que borrar
  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;
  constructor(private productoService: ProductoService) {
    this.recuperarTodos();
  }

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //compruebo que el nombre no sea demasiado largo
    if (!this.prod.nombre || this.prod.nombre.length > longMax) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else {
      nom.classList.remove('is-invalid');
    }

    if (!this.prod.precio || this.prod.precio <= 0) {
      prc.classList.add('is-invalid');
      this.valido = false;
    } else {
      prc.classList.remove('is-invalid');
    }
  }

  recuperarTodos() {
    this.productoService.recuperarTodos().subscribe((respuesta: any) => {
      this.productos = respuesta;
    });
  }

  tempBorr(producto: Producto) {
    this.temp = producto;
  }

  confirmaBorrar() {
    //comprueba el código, si es diferente al original, es que se ha seleccionado un artículo
    if (this.temp.Id != 0) {
      this.baja(this.temp);
    }
  }

  baja(producto: Producto) {
    this.productoService.baja(producto).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.recuperarTodos();
      }
    });
  }
  modificacion() {
    this.validar();

    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('is-valid');

    if (this.valido) {
      this.productoService.modificacion(this.prod).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.recuperarTodos();
          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
        }
      });
    }
  }
  seleccionar(producto: Producto) {
    this.productoService
      .seleccionar(producto)
      .subscribe((result: any) => (this.prod = result[0]));
  }
}
