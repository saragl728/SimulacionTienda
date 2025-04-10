import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { ProdCant } from '../../models/ProdCant';
import { InventarioService } from '../../servicios/inventario.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-mi-cuenta',
  imports: [FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  constructor(private usuarioServicio: UsuarioService, private inventarioServicio: InventarioService) {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  }
  sesionIniciada = false;
  usuarioAdmin = false;
  usuario = "";
  persona: Usuario;
  contr2 = "";
  inventario: Array<ProdCant> = [];

  inicioSesion() {
    this.usuarioServicio.entraNormal(this.persona).subscribe((result: any) => {      
      if (result != null && result.length > 0){
        this.persona = result[0];
        if (this.persona.adminis != ""){
          this.sesionIniciada = true;
          this.persona.contrasenya = "";  //la pongo a cadena vacía para que en la sección de modificación no salga la ristra
          //ahora busco el inventario
          this.inventarioServicio.productosDeUsuario(this.persona.Id).subscribe((resultado: any) => {
            this.inventario = resultado;
            console.log(this.inventario)
          })
        } 
    }
  });    
  }

  editarCuenta(){

  }
}
