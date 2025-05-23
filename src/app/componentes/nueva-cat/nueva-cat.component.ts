import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { Usuario } from '../../models/Usuario';
import { CategoriaService } from '../../servicios/categoria.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Sonido } from '../../models/Sonido';

@Component({
  selector: 'app-nueva-cat',
  imports: [FormsModule],
  templateUrl: './nueva-cat.component.html',
  styleUrl: './nueva-cat.component.css',
})
export class NuevaCatComponent extends Sonido {
  constructor(private categoriaServicio: CategoriaService, private usuarioServicio: UsuarioService) {
    super();
    this.obtenerNombres();
    this.numAdmins();
    document.title = $localize`Nueva categoría`;
  }

  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  cat: Categoria = { Id: 0, nombre: '' };
  valido: boolean = true;
  categorias: Array<any> = [];
  sesionIniciada: boolean = false;
  nAdmins: number = 0;

    /**
   * Se usa para ver si hay administradores que puedan hacer algo
   */
  numAdmins() {
    this.usuarioServicio.numeroAdmins().subscribe((result: any) => {
      if (result != null) this.nAdmins = result[0].cantidad;
    })
  }

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.cat = { Id: 0, nombre: '' };
    this.suenaCierre();
  }
  
  inicioSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;
    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        if (this.persona.adminis == 'S') {
          this.sesionIniciada = true;
          this.suenaInicio();
        } else {
          this.alertaFallo($localize`No tienes los permisos necesarios`);
          this.persona.contrasenya = '';
          usu.classList.add('is-invalid');
          contr.classList.add('is-invalid');
        }
      } else {
        this.alertaFallo($localize`Usuario y/o contraseña incorrectos`);
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }  

  /**
   * Para obtener los nombres de categorías que hay para que el usuario no intente usarlos de nuevo
   */
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
    }
    else nom.classList.remove('is-invalid');
  }

  alta() {
    let nom = document.getElementById('description') as HTMLInputElement;
    nom.classList.remove('is-valid');
    this.validar();
    if (this.valido) {
      this.categoriaServicio.alta(this.cat).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          nom.classList.add('is-valid');
          this.obtenerNombres();
          this.suenaGlobo();
        }
      });
    }
    else this.suenaError();
  }
}
