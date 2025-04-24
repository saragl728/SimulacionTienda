export class Resenya {
    Id: number;
    IdProducto: number;
    IdCliente: number;
    contenido: string;
    fecha: string;
    constructor(Id: number, IdProducto: number, IdCliente: number, contenido: string, fecha: string){
        this.Id = Id;
        this.IdProducto = IdProducto;
        this.IdCliente = IdCliente;
        this.contenido = contenido;
        this.fecha = fecha;
    }
}