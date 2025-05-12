import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { SesionAdmin } from '../../models/SesionAdmin';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-nuevo-prod',
  imports: [FormsModule],
  templateUrl: './nuevo-prod.component.html',
  styleUrl: './nuevo-prod.component.css',
})
export class NuevoProdComponent extends SesionAdmin {
  constructor(private productoServicio: ProductoService, private usuarioServicio: UsuarioService) {
    super();
    this.obtenerNombres();
    document.title = $localize`Nuevo producto`;
  }

  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;
  nombres: Array<any> = []; //array con los nombres de los productos, se usará para que el usuario tenga claro qué nombres no se pueden meter
  
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
    this.productoServicio.obtenerNombres().subscribe((result: any) => {
      for (let i = 0; i < result.length; i++){
        this.nombres.push(result[i].nombre)
      }
    });
  }

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //comprobación del nombre
    if (!this.prod.nombre || this.prod.nombre.length > longMax || this.nombres.includes(this.prod.nombre)) {
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
