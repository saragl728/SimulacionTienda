import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompraService } from '../../servicios/compra.service';
import { InventarioService } from '../../servicios/inventario.service';
import { ProductoService } from '../../servicios/producto.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Compra } from '../../models/Compra';
import { Carrito } from '../../models/Carrito';
import { AuxCarro } from '../../models/AuxCarro';
import { Producto } from '../../models/Producto';
import { Inventario } from '../../models/Inventario';

@Component({
  selector: 'app-hacer-compra',
  imports: [FormsModule],
  templateUrl: './hacer-compra.component.html',
  styleUrl: './hacer-compra.component.css',
})
export class HacerCompraComponent {
  constructor(private productoServicio: ProductoService, private usuarioServicio: UsuarioService, private compraServicio: CompraService, private inventarioServicio: InventarioService) {
    this.sacarComprables();
    this.persona = {Id: 0, nombre: '', correo: '',fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.compra = {Id: 0, IdCliente: 0, fecha: ''};
    document.title = $localize`Comprar`;
  }
  
  readonly CANTIDAD_GRANDE: number = 15;

  sesionIniciada: boolean = false;
  persona: Usuario;
  compra: Compra;
  temp: Producto = { Id: 0, nombre: '', precio: 0 };  //lo necesitaremos después
  carro: Array<Carrito> = [];
  carritoAux: Array<AuxCarro> = [];
  comprables: any;
  nombresEnCarrito: Array<string> = []; //variable que se usará para comprobar si un nombre está en el carrito
  cantidad: number = 1;
  costeAcumulado: number = 0; //lo necesitaremos para saber cuánto hay que quitar de la cuenta del usuario y si el usuario tiene saldo suficiente
  busca: string = "";

  cierraSesion(){
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
    this.sesionIniciada = false;
    this.cantidad = 1;
    this.carro = [];
    this.carritoAux = [];
    this.nombresEnCarrito = [];
    this.costeAcumulado = 0;
    this.busca = '';
    this.temp = { Id: 0, nombre: '', precio: 0 };
  }

  iniciarSesion() {
    let usu = document.getElementById('usuario') as HTMLInputElement;
    let contr = document.getElementById('contrasenya') as HTMLInputElement;

    this.usuarioServicio.iniSesion(this.persona).subscribe((result: any) => {
      if (result != null) {
        this.persona = result;
        this.persona.contrasenya = '';
        this.sesionIniciada = true;
        this.compra.IdCliente = this.persona.Id; //le asignamos a la compra el id del usuario actual
      }
      else {
        usu.classList.add('is-invalid');
        contr.classList.add('is-invalid');
      }
    });
  }

  buscaPorNombre(){
    this.productoServicio.buscaPorNombre(this.busca).subscribe((result: any) => (this.comprables = result));
  }

  //para sacar en un string los datos básicos del carrito del usuario
  carritoString(): string {
    let salida = "";
    for (let i = 0; i < this.carritoAux.length; i++){
      salida += this.carritoAux[i].nombre + ": " + this.carritoAux[i].cantidad + "\n";
    }

    return salida;
  }

  anyadirAlCarro(){
    if (this.cantidad > 0 && this.cantidad % 1 == 0){
      let c = new Carrito(0, this.temp.Id, this.cantidad);
      this.carro.push(c);
      //crear un objeto auxiliar
      let k = new AuxCarro(this.temp.nombre, this.cantidad);
      this.carritoAux.push(k);
      //añado el importe a la variable costeAcumulado
      this.costeAcumulado += this.temp.precio * this.cantidad;
      this.nombresEnCarrito.push(this.temp.nombre);
    }
    this.cantidad = 1;  //se reinicia para que después no vuelva a aparecer con el mismo valor
  }

  sacarComprables() {
    this.productoServicio.recuperarTodos().subscribe((respuesta: any) => {
      this.comprables = respuesta;
    });
  }

  //se usa un bucle porque el objeto carrito es un array
  ponerEnCarritoComprado(){
    for (let i = 0; i < this.carro.length; i++) {
      this.compraServicio.anyadeCarrito(this.carro[i]).subscribe((datos: any) => {
          if (datos.resultado == 'OK') {
            console.log('Producto añadido al carrito');
            //actualizar correctamante cuando se añaden objetos
            this.inventarioServicio.cantidadInventario(this.persona.Id, this.carro[i].IdProducto).subscribe((res: any) => {
                if (res != null) {
                  let can1 = Number(res[0].cantidad) + this.carro[i].cantidad;
                  let novInv = new Inventario(this.persona.Id, this.carro[i].IdProducto, can1);
                  this.inventarioServicio.actualizaInventario(novInv).subscribe((result: any) => {});
                } else {
                  let nuevoInv = new Inventario(this.persona.Id, this.carro[i].IdProducto, this.carro[i].cantidad);
                  this.inventarioServicio.anyadeInventario(nuevoInv).subscribe((result: any) => {});
                }
              });
          }
        });
    }
  }

  tempCarr(producto: Producto){
    this.temp = producto;
  }

  reiniciaCarrito() {
    this.costeAcumulado = 0;
    this.carritoAux = [];
    this.nombresEnCarrito = [];
  }

  comprar() {
    this.compraServicio.creaCompra(this.compra).subscribe((datos: any) => {
      if (datos.resultado == 'OK') {
        console.log('Compra realizada');
        this.compraServicio.ultimoId().subscribe((d: any) => {
          for (let ca of this.carro) {
            ca.IdCompra = d[0].Id; //asigno el último Id a los elementos de carro
          }
          this.ponerEnCarritoComprado();

          //se actualiza el saldo del usuario
          this.persona.saldo -= this.costeAcumulado;
          this.usuarioServicio.actualizaSaldo(this.persona).subscribe((v: any) => {
              if (v.resultado == 'OK') {
                console.log('Saldo actualizado');
                this.reiniciaCarrito(); //se reinicia el carrito para comprar sin problemas
              }
            });
        }
      );
      }
    });
  }
}
