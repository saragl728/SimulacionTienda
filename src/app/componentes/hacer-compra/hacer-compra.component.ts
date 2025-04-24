import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-hacer-compra',
  imports: [FormsModule],
  templateUrl: './hacer-compra.component.html',
  styleUrl: './hacer-compra.component.css',
})
export class HacerCompraComponent {
  constructor(
    private productoServicio: ProductoService,
    private usuarioServicio: UsuarioService
  ) {
    this.sacarComprables();
    this.persona = {
      Id: 0,
      nombre: '',
      correo: '',
      fechaNac: '',
      saldo: 150,
      contrasenya: '',
      adminis: 'N',
    };
  }
  sesionIniciada: boolean = false;
  persona: Usuario;

  iniciarSesion() {
    this.usuarioServicio.entraNormal(this.persona).subscribe((result: any) => {
      if (result != null && result.length > 0) {
        this.persona = result[0];
        if (this.persona.adminis != '') {
          this.sesionIniciada = true;
        }
      }
    });
  }

  comprables: any;

  sacarComprables() {
    this.productoServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.comprables = respuesta;
    });
  }

  comprar(){
    
  }
}
