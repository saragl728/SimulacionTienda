export class Inventario {
  IdUsuario: number;
  IdProducto: number;
  cantidad: number;
  constructor(IdUsuario: number, IdProducto: number, cantidad: number) {
    this.IdUsuario = IdUsuario;
    this.IdProducto = IdProducto;
    this.cantidad = cantidad;
  }
}
