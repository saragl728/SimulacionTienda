import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResenyaService } from '../../servicios/resenya.service';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Resenya } from '../../models/Resenya';

@Component({
  selector: 'app-resenya',
  imports: [FormsModule],
  templateUrl: './resenya.component.html',
  styleUrl: './resenya.component.css'
})
export class ResenyaComponent {
  constructor(private resenyaServicio: ResenyaService, private usuarioServicio: UsuarioService, private productoService: ProductoService){
    this.sacarTodas();
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.rese = { Id: 0, IdProducto: 0, IdCliente: 0, contenido: '', fecha: ''};
    this.recuperaProds();
  }
  resenyas: any;
  productos: any;
  persona: Usuario;
  rese: Resenya;
  sesionIniciada: boolean = false;
  valido: boolean = true;
  filtro: string = "";

  sacarTodas(){
    this.resenyaServicio.mostrarTodas().subscribe((respuesta: any) => {
      this.resenyas = respuesta;
    });
  }

  buscarPorNombreProducto(){
    this.resenyaServicio.resenyaPorNombre(this.filtro).subscribe((respuesta: any) => {
      this.resenyas = respuesta;
    });
  }

  recuperaProds() {
    this.productoService.recuperarTodos().subscribe((respuesta: any) => {
      this.productos = respuesta;
    });
  }

  iniciarSesion(){
    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null){
        this.persona = result;
          this.persona.contrasenya = "";
          this.sesionIniciada = true;
        
    }
    })
  }

  validar(){
    this.valido = true;

    const LONG_MAX = 200;

    let opi = document.getElementById('areaOp') as HTMLInputElement;
    let pro = document.getElementById('prodc') as HTMLInputElement;

    if (!this.rese.IdProducto) {
      pro.classList.add('is-invalid');
      this.valido = false;
    } else pro.classList.remove('is-invalid');

    if (!this.rese.contenido || this.rese.contenido.length > LONG_MAX) {
      opi.classList.add('is-invalid');
      this.valido = false;
    } else {
      opi.classList.remove('is-invalid');
    }
  }

  anyadirResenya(){
    let opi = document.getElementById('areaOp') as HTMLInputElement;
    let pro = document.getElementById('prodc') as HTMLInputElement;

    opi.classList.remove('is-valid');
    pro.classList.remove('is-valid');

    this.validar();

    this.rese.IdCliente = this.persona.Id;

    this.resenyaServicio.anyadir(this.rese).subscribe((datos: any) => {
      if (datos.resultado == 'OK') {
        console.log('Reseña añadida');
        this.sacarTodas();  //si funciona, hace que cargue las reseñas
        opi.classList.add('is-valid');
        pro.classList.add('is-valid');
      } else {
        console.log('No se ha podido añadir la reseña');
      }
    });
  }
}
