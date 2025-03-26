import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-nuevo-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-prod.component.html',
  styleUrl: './nuevo-prod.component.css',
})
export class NuevoProdComponent {
  constructor(private productoServicio: ProductoService) {
    this.obtenerNombres();
  }

  obtenerNombres() {
    this.productoServicio.obtenerNombres().subscribe((result: any) => {
      this.nombres = result;
    });
  }

  //esto se usará para decirle al usuario los productos que hay
  estringNombres(): string{
    let aux = [];
    for (var i = 0; i < this.nombres.length; i++) {
      aux.push(this.nombres[i].nombre)
    }
    return aux.join(', ')
  }

  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;
  nombres: Array<any> = []; //array con los nombres de los productos, se usará para que el usuario tenga claro qué nombres no se pueden meter

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //comprobación del nombre
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

  alta() {
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
      this.productoServicio.alta(this.prod).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          console.log('Producto añadido');

          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
          this.obtenerNombres();
        } else {
          console.log('No se ha podido añadir el producto');
        }
      });
    }
  }
}
