import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../servicios/categoria.service';

@Component({
  selector: 'app-conf-cat',
  imports: [FormsModule],
  templateUrl: './conf-cat.component.html',
  styleUrl: './conf-cat.component.css',
})
export class ConfCatComponent {
  categorias: any;
  nom = document.getElementById('description');
  temp: Categoria = { Id: 0, nombre: '' };
  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  constructor(private categoriaService: CategoriaService) {
    this.recuperarTodos();
  }

  validar() {
    const longMax: number = 20; //longitud máxima de la categoría
    let nom = document.getElementById('description') as HTMLInputElement;

    if (!this.cat.nombre || this.cat.nombre.length > longMax) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else {
      nom.classList.remove('is-invalid');
    }
  }

  recuperarTodos() {
    this.categoriaService.recuperarTodos().subscribe((respuesta: any) => {
      this.categorias = respuesta;
    });
  }

  tempBorr(categoria: Categoria) {
    this.temp = categoria;
  }

  confirmaBorrar() {
    if (this.temp.Id != 0) {
      this.baja(this.temp);
    }
  }

  baja(categoria: Categoria) {
    this.categoriaService.baja(categoria).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.recuperarTodos();
      }
    });
  }
  modificacion() {
    this.validar();

    let nom = document.getElementById('description') as HTMLInputElement;

    nom.classList.remove('is-valid');

    if (this.valido) {
      this.categoriaService.modificacion(this.cat).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.recuperarTodos();
          nom.classList.add('is-valid');
        }
      });
    }
  }
  seleccionar(categoria: Categoria) {
    this.categoriaService
      .seleccionar(categoria)
      .subscribe((result: any) => (this.cat = result[0]));
  }
}
