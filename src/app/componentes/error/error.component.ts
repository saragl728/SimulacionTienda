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
  readonly LIMITE : number = 1000 * 60 * 15;
  
  a = setTimeout(this.salta, this.LIMITE);  //después de que pase el tiempo se hará la redirección
  
  //función que dice cuándo se redirigirá al usuario desde que se cargó la página
  tiempoRestante(){
    let mens: string = "";
    const MINUT = 60000;
    const SEGU = 1000;

    if (this.LIMITE < MINUT) mens = (this.LIMITE / SEGU).toString() + $localize` segundo(s)`;
    else {
      if (this.LIMITE % MINUT == 0) mens = (this.LIMITE / MINUT).toString() + $localize` minuto(s)`;
      else mens = ((this.LIMITE - (this.LIMITE % MINUT)) / MINUT).toString() + $localize` minuto(s) y ` + ((this.LIMITE % MINUT) / SEGU).toString() + $localize` segundo(s)`;
    }

    return mens;
  }

  salta(){
    location.replace('/mi-cuenta');
  }

}
