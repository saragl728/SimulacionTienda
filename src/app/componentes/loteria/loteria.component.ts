import { Component } from '@angular/core';
import { InventarioService } from '../../servicios/inventario.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProductoService } from '../../servicios/producto.service';
import { Usuario } from '../../models/Usuario';
import { Producto } from '../../models/Producto';
import { FormsModule } from '@angular/forms';
import { Inventario } from '../../models/Inventario';

@Component({
  selector: 'app-loteria',
  imports: [FormsModule],
  templateUrl: './loteria.component.html',
  styleUrl: './loteria.component.css'
})
export class LoteriaComponent {
  constructor(private usuarioServicio: UsuarioService, private inventarioServicio: InventarioService, private productoServicio: ProductoService) {
      this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    }

    readonly PORCENTAJE_MAX: number = 0.3333; //porcentaje máximo del saldo que se puede apostar
    cantidad: number = 0;
    haBuscado: boolean = false;
    persona: Usuario;
    sesionIniciada = false;
    listaObjetos: Array<Producto> = [];

    puedeBuscar(): boolean{
      return this.cantidad < (this.persona.saldo * this.PORCENTAJE_MAX)
    }

    //lo necesitamos para saber si el usuario puede usar la lotería
    esAdulto(): boolean {
      const ADULTO = 18;
      let edadAdulto: boolean = true;
      let fe = new Date(this.persona.fechaNac);
      const aux: Date = new Date(); //fecha actual
  
      let ed = aux.getFullYear() - fe.getFullYear();
  
      if (ed < ADULTO) {
        edadAdulto = false;
      } else {
        if (ed == ADULTO) {
          //se comprueba si en este mes se ha cumplido la edad mínima
          if (fe.getMonth() > aux.getMonth()) {
            edadAdulto = false;
          } else {
            //si se cumple en este mes, se comprueba si ya se ha cumplido
            if (aux.getMonth() == fe.getMonth() && fe.getDate() > aux.getDate())
              edadAdulto = false;
          }
        }
      }
  
      return edadAdulto;
    }

    inicioSesion() {
      this.usuarioServicio.entraNormal(this.persona).subscribe((result: any) => {      
        if (result != null && result.length > 0){
          this.persona = result[0];
          if (this.persona.adminis != "") {
            this.persona.contrasenya = "";  //la pongo a cadena vacía para que en la sección de modificación no salga la ristra
            if (this.esAdulto()){
              this.sesionIniciada = true;
            }
          } 
      }
    });    
    }

    apostar(){
      let produ : Producto= { Id: 0, nombre: '', precio: 0 };
      let n = Math.floor(Math.random() * this.listaObjetos.length); //sacamos el índice del objeto del array
      produ = this.listaObjetos[n];

      //hay que hacer que añada una unidad de este producto al inventario del usuario
      this.inventarioServicio.cantidadInventario(this.persona.Id, produ.Id).subscribe((result: any) => {
        if (result != null) {
          let can1 = result[0].cantidad++;
          let novInv = new Inventario(this.persona.Id, produ.Id, can1);
          this.inventarioServicio.actualizaInventario(novInv).subscribe((result: any) => {});
        }
        else{
          //se añade uno
          let nuevoInv = new Inventario(this.persona.Id, produ.Id, 1);
          this.inventarioServicio.anyadeInventario(nuevoInv).subscribe((result: any) => {})
        }
        this.persona.saldo -= this.cantidad;
        this.usuarioServicio.actualizaSaldo(this.persona).subscribe((result: any) => {})
      }
    )
    }
    
    redondeaDecimales(numero: number){
      return Math.round(numero * 100) / 100;
    }

    sacaObjetos(){
      let min = this.redondeaDecimales(this.cantidad * 0.9)
       let max = this.redondeaDecimales(this.cantidad * 1.1)

      if (!this.haBuscado) this.haBuscado = true;

      if (this.puedeBuscar()){
        this.productoServicio.sacarEntrePrecios(min, max).subscribe((result: any) => {
          this.listaObjetos = [];
          if (result != null) {
            for (let i = 0; i < result.length; i++){
              let au = new Producto(result[i].Id, result[i].nombre, result[i].precio);
              this.listaObjetos.push(au);
            }
          }
        })
      }
    }
}
