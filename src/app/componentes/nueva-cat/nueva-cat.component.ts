import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { SesionAdmin } from '../../models/SesionAdmin';
import { CategoriaService } from '../../servicios/categoria.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-nueva-cat',
  imports: [FormsModule],
  templateUrl: './nueva-cat.component.html',
  styleUrl: './nueva-cat.component.css',
})
export class NuevaCatComponent extends SesionAdmin {
  constructor(private categoriaServicio: CategoriaService, private usuarioServicio: UsuarioService) {
    super();
    this.obtenerNombres();
    console.log(this.categorias);
  }

  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  categorias: Array<any> = [];
  
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

  obtenerNombres() {
    this.categoriaServicio.obtenerNombres().subscribe((result: any) => {
      for (let i = 0; i < result.length; i++){
        this.categorias.push(result[i].nombre)
      }
    });
  }

  validar() {
    const longMax: number = 20; //longitud máxima de la categoría
    let nom = document.getElementById('description') as HTMLInputElement;

    if (!this.cat.nombre || this.cat.nombre.length > longMax || this.categorias.includes(this.cat.nombre)) {
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
