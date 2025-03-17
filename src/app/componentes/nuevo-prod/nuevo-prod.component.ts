import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../producto.service';

@Component({
  selector: 'app-nuevo-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-prod.component.html',
  styleUrl: './nuevo-prod.component.css',
})
export class NuevoProdComponent {
  constructor(private productoServicio: ProductoService) {}

  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;

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

  alta() {
    this.validar();
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('fis-valid');
    if (this.valido) {
      this.productoServicio.alta(this.prod).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          console.log('Producto añadido');

          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
        } else {
          console.log('No se ha podido añadir el producto');
        }
      });
    }
  }
}
