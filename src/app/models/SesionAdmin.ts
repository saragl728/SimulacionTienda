export class SesionAdmin {
    usuario = "";
    sesionIniciada = false;
  
    inicioSesion(){
      if (this.usuario.trim()!= "") this.sesionIniciada = true;
    }
}