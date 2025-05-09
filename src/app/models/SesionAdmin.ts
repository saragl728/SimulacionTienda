import { Usuario } from "./Usuario";

export class SesionAdmin {
  constructor(){
    this.persona = { Id: 0, nombre: '', correo: '', fechaNac: '', saldo: 150, contrasenya: '', adminis: 'N'};
  }

    usuario = "";
    sesionIniciada = false;
    persona: Usuario;
    aiuda: string = 'N';
}