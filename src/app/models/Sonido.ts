/**
 * Clase que se usa en la mayoría de componentes para la reproducción de sonidos
 */
export class Sonido {
  private sonidoInicioSesion = new Audio('./WinXpStartup.mp3');
  private sonidoCierre = new Audio('./WinXpShutdown.mp3');
  private sonidoError = new Audio('./WinXpError.mp3');
  private sonidoGlobo = new Audio('./WinXpBalloon.mp3');
  private sonidoBorra = new Audio('./WinXpRecycle.mp3');

  suenaCierre() {
    this.sonidoCierre.play();
  }

  suenaError() {
    this.sonidoError.play();
  }

  suenaInicio() {
    this.sonidoInicioSesion.play();
  }

  suenaBorra() {
    this.sonidoBorra.play();
  }

  /**
   * Función que hace aparecer un Alert y reproduce un sonido de error
   * @param mensaje Mensaje que aparecerá en el mensaje de alerta
   */
  alertaFallo(mensaje: string) {
    this.sonidoError.play();
    alert(mensaje);
  }

  suenaGlobo() {
    this.sonidoGlobo.play();
  }
}
