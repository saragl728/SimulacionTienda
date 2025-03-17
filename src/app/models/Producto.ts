export class Producto {
  Id: number;
  nombre: string;
  precio: number;
  constructor(Id: number, nombre: string, precio: number) {
    this.Id = Id;
    this.nombre = nombre;
    this.precio = precio;
  }
}
