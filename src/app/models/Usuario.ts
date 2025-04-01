export class Usuario {
    Id: number;
    nombre: string;
    correo: string;
    fechaNac: Date;
    saldo: number;
    contrasenya: string;
    adminis: string;
    constructor(Id: number, nombre: string, correo: string, fechaNac: Date, saldo: number, contrasenya: string, adminis: string) {
      this.Id = Id;
      this.nombre = nombre;
      this.correo = correo;
      this.fechaNac = fechaNac;
      this.saldo = saldo;
      this.contrasenya = contrasenya;
      this.adminis = adminis;
    }
}