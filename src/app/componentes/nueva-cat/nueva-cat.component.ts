import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../servicios/categoria.service';

@Component({
  selector: 'app-nueva-cat',
  imports: [FormsModule],
  templateUrl: './nueva-cat.component.html',
  styleUrl: './nueva-cat.component.css',
})
export class NuevaCatComponent {
  constructor(private categoriaServicio: CategoriaService) {
    this.obtenerNombres();
  }

  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  categorias: Array<any> = [];

  estringNombres(): string {
    let aux = [];

    for (var i = 0; i < this.categorias.length; i++) {
      aux.push(this.categorias[i].nombre);
    }
    return aux.join(', ');
  }

  //TODO: tengo que crear la consulta
  obtenerNombres() {
    this.categoriaServicio.obtenerNombres().subscribe((result: any) => {
      this.categorias = result;
    });
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

  alta() {
    let nom = document.getElementById('description') as HTMLInputElement;
    nom.classList.remove('is-valid');
    this.validar();
    if (this.valido) {
      this.categoriaServicio.alta(this.cat).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          console.log('Categoría añadida');
          nom.classList.add('is-valid');
          this.obtenerNombres();
        } else {
          console.log('No se ha podido añadir la categoría');
        }
      });
    }
  }
}
