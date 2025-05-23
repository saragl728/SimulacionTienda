import { Component } from '@angular/core';
import { InventarioService } from '../../servicios/inventario.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProductoService } from '../../servicios/producto.service';
import { Usuario } from '../../models/Usuario';
import { Producto } from '../../models/Producto';
import { FormsModule } from '@angular/forms';
import { Inventario } from '../../models/Inventario';
import { Sonido } from '../../models/Sonido';

@Component({
  selector: 'app-loteria',
  imports: [FormsModule],
  templateUrl: './loteria.component.html',
  styleUrl: './loteria.component.css',
})
export class LoteriaComponent extends Sonido {
  constructor(private usuarioServicio: UsuarioService, private inventarioServicio: InventarioService, private productoServicio: ProductoService) {
    super();
    this.numUsuarios();
    document.title = $localize`Lotería`;
  }

  /**Porcentaje máximo del saldo que se puede apostar */
  readonly PORCENTAJE_MAX: number = 0.3333;
  cantidad: number = 0;
  haBuscado: boolean = false;
  persona: Usuario = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '',adminis: 'N'};;
  sesionIniciada = false;
  listaObjetos: Array<Producto> = [];
  nUsuarios: number = 0; 

  cierraSesion() {
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.cantidad = 0;
    this.haBuscado = false;
    this.listaObjetos = [];
    this.suenaCierre();
  }

    /**
   * Esta función se carga al inicio para saber si hay usuarios y hacer que muestre un contenido en función del resultado
   */
  numUsuarios() {
    this.usuarioServicio.numeroUsuarios().subscribe((result: any) => {
      if (result != null) this.nUsuarios = result[0].cantidad;
    })
  }

  puedeBuscar(): boolean {
    return this.cantidad < this.persona.saldo * this.PORCENTAJE_MAX;
  }

  /**
   * Comprueba si el usuario que inicia sesión es adulto o no
   * @returns True si tiene 18 años o más, false si no
   */
  esAdulto(): boolean {
    const ADULTO = 18;
    let edadAdulto: boolean = true;
    let fe = new Date(this.persona.fechaNac);
    const aux: Date = new Date(); //fecha actual

    let ed = aux.getFullYear() - fe.getFullYear();

    if (ed < ADULTO) edadAdulto = false;
    else {
      if (ed == ADULTO) {
        //se comprueba si en este mes se ha cumplido la edad mínima
        if (fe.getMonth() > aux.getMonth()) edadAdulto = false;
        else {
          //si se cumple en este mes, se comprueba si ya se ha cumplido
          if (aux.getMonth() == fe.getMonth() && fe.getDate() > aux.getDate()) edadAdulto = false;
        }
      }
    }
    return edadAdulto;
  }

  inicioSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;

    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        if (this.esAdulto()){
          this.sesionIniciada = true;
          this.suenaInicio();
        }
        else {
          this.alertaFallo($localize`Eres demasiado joven para esto. Tienes que tener al menos 18 años`)
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

  apostar() {
    let produ: Producto = { Id: 0, nombre: '', precio: 0 };
    let n = Math.floor(Math.random() * this.listaObjetos.length); //sacamos el índice del objeto del array
    produ = this.listaObjetos[n];

    this.inventarioServicio.cantidadInventario(this.persona.Id, produ.Id).subscribe((result: any) => {
        if (result != null) {
          let can1 = result[0].cantidad++;
          let novInv = new Inventario(this.persona.Id, produ.Id, can1);
          this.inventarioServicio.actualizaInventario(novInv).subscribe((result: any) => {});
        } else {
          //se añade uno
          let nuevoInv = new Inventario(this.persona.Id, produ.Id, 1);
          this.inventarioServicio.anyadeInventario(nuevoInv).subscribe((result: any) => {});
        }
        this.persona.saldo -= this.cantidad;
        this.usuarioServicio.actualizaSaldo(this.persona).subscribe((result: any) => { this.suenaGlobo() });
      });
  }

  redondeaDecimales(numero: number) {
    return Math.round(numero * 100) / 100;
  }

  /**
   * Obtiene los productos cuyo precio está en un rango de +-10% del precio que se ha puesto
   */
  sacaObjetos() {
    let min = this.redondeaDecimales(this.cantidad * 0.9);
    let max = this.redondeaDecimales(this.cantidad * 1.1);

    if (!this.haBuscado) this.haBuscado = true;

    if (this.puedeBuscar()) {
      this.productoServicio.sacarEntrePrecios(min, max).subscribe((result: any) => {
          this.listaObjetos = [];
          if (result != null) {
            for (let i = 0; i < result.length; i++) {
              let au = new Producto(result[i].Id, result[i].nombre, result[i].precio);
              this.listaObjetos.push(au);
            }
          }
        });
    }
  }
}
