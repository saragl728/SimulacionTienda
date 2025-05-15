import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { Usuario } from '../../models/Usuario';
import { CategoriaService } from '../../servicios/categoria.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-nueva-cat',
  imports: [FormsModule],
  templateUrl: './nueva-cat.component.html',
  styleUrl: './nueva-cat.component.css',
})
export class NuevaCatComponent {
  constructor(private categoriaServicio: CategoriaService, private usuarioServicio: UsuarioService) {
    this.obtenerNombres();
    document.title = $localize`Nueva categoría`;
  }

  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  categorias: Array<any> = [];
  sesionIniciada: boolean = false;

  cierraSesion(){
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.cat= { Id: 0, nombre: '' };
  }
  
  inicioSesion(): void {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;
    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
        } else {
          this.persona.contrasenya = '';
          usu.classList.add('is-invalid');
          contr.classList.add('is-invalid');
        }
      } else {
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
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
