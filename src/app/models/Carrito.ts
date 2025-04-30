export class Carrito {
    IdCompra: number;
    IdProducto: number;
    cantidad: number;
    constructor(IdCompra: number, IdProducto: number, cantidad: number){
        this.IdCompra = IdCompra;
        this.IdProducto = IdProducto;
        this.cantidad = cantidad;
    }
}