export class Compra {
    Id: number;
    IdCliente: number;
    fecha: string;
    constructor(Id: number, IdCliente: number, fecha: string){
        this.Id = Id;
        this.IdCliente = IdCliente;
        this.fecha = fecha;
    }
}