import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(){
    document.title = $localize`Error`;
  }

  /**Variable que se usa para la cuenta atrás */
  readonly LIMITE : number = 1000 * 60 * 15;
  
  a = setTimeout(this.salta, this.LIMITE);  //después de que pase el tiempo se hará la redirección
  
  //
  /**
   * Función que dice cuándo se redirigirá al usuario desde que se cargó la página
   * @returns Mensaje que dice cuántos minutos y segundos faltan para que se cambie de página desde que se entró a la página de error
   */
  tiempoRestante() {
    let mens: string = "";
    const MINUT = 60000;
    const SEGU = 1000;

    if (this.LIMITE < MINUT) mens = $localize`${(this.LIMITE / SEGU).toString()} segundos`;
    else {
      if (this.LIMITE % MINUT == 0) mens = $localize`${(this.LIMITE / MINUT).toString()} minutos(s)`;
      else mens = $localize`${((this.LIMITE - (this.LIMITE % MINUT)) / MINUT).toString()} minutos(s) y ${((this.LIMITE % MINUT) / SEGU).toString()} segundo(s)` ;
    };

    return mens;
  }

  salta() {
    location.replace('/mi-cuenta');
  }

}
