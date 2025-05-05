import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { SesionAdmin } from '../../models/SesionAdmin';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-conf-prod',
  imports: [FormsModule],
  templateUrl: './conf-prod.component.html',
  styleUrl: './conf-prod.component.css',
})

export class ConfProdComponent extends SesionAdmin {
  productos: any;
  temp: Producto = { Id: 0, nombre: '', precio: 0 }; //variable temporal para cuando tengamos que borrar
  prod: Producto = { Id: 0, nombre: '', precio: 0 };
  valido: boolean = true;
  busca: string = "";

  constructor(private productoService: ProductoService, private usuarioServicio: UsuarioService) {
    super();
    this.recuperarTodos();
  }

  buscaPorNombre(){
    this.productoService.buscaPorNombre(this.busca).subscribe((result: any) => (this.productos = result));
  }

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

  validar() {
    this.valido = true;
    const longMax = 30; //longitud máxima del nombre

    //nombre y precio
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    //compruebo la longitud del nombre y si existe el nombre
    if (!this.prod.nombre || this.prod.nombre.length > longMax) {
      nom.classList.add('is-invalid');
      this.valido = false;
    } else nom.classList.remove('is-invalid');
    

    if (!this.prod.precio || this.prod.precio <= 0) {
      prc.classList.add('is-invalid');
      this.valido = false;
    } else prc.classList.remove('is-invalid');
          
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
      if (datos.resultado == 'OK') {
        this.recuperarTodos();
      }
    });
  }

  modificacion() {
    let nom = document.getElementById('description') as HTMLInputElement;
    let prc = document.getElementById('price') as HTMLInputElement;

    nom.classList.remove('is-valid');
    prc.classList.remove('is-valid');

    this.validar();

    if (this.valido) {
      this.productoService.modificacion(this.prod).subscribe((datos: any) => {
        if (datos.resultado == 'OK') {
          this.recuperarTodos();
          nom.classList.add('is-valid');
          prc.classList.add('is-valid');
        }
        else {
          nom.classList.add('is-invalid');
          prc.classList.add('is-invalid');
        }
      }
    );
    }
  }
  seleccionar(producto: Producto) {
    this.productoService.seleccionar(producto).subscribe((result: any) => (this.prod = result[0]));
  }
}
