import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private location: Location) {}

  //función que devuelve información de una página dependiendo de la ruta
  infoPag() {
    let info: string = '';
    switch (this.location.path()) {
      case '/nuevo-prod':
        info = $localize`Aquí puedes añadir nuevos productos. Tienen nombres únicos y obviamente su precio no puede ser igual o inferior a 0.`;
        break;
      case '/nueva-cat':
        info = $localize`Aquí puedes añadir nuevas categorías de productos. Tienen nombres únicos.`;
        break;
      case '/conf-prod':
        info = $localize`Aquí puedes ver los productos actuales. Puedes modificarlos y eliminarlos si eres administrador.`;
        break;
      case '/conf-cat':
        info = $localize`Aquí puedes ver las categorías disponibles de productos y eliminarlas si eres administrador.`;
        break;
      case '/nuevo-cat-prod':
        info = $localize`Aquí puedes conectar categorías con productos.`;
        break;
      case '/conf-cat-prod':
        info = $localize`Aquí puedes ver las conexiones de categorías con productos y eliminarlas si eres administrador. También puedes hacer búsquedas.`;
        break;
      case '/nuevo-usuario':
        info = $localize`Crea tu cuenta de usuario.`;
        break;
      case '/mi-cuenta':
        info = $localize`Aquí puedes ver los detalles sobre tu cuenta. Puedes cambiar tu nombre de usuario y tu contraseña.`;
        break;
      case '/resenya':
        info = $localize`Aquí puedes ver las opiniones de los clientes de los productos y dar la tuya.`;
        break;
      case '/comprar':
        info = $localize`Aquí puedes hacer tu compra.`;
        break;
      case '/loteria':
        info = $localize`Aquí puedes obtener un objeto aleatorio cuyo precio sea cercano al importe que quieras. Sólo para adultos.`
        break;
      case '/error':
        info = $localize`Has escrito mal la ruta en el navegador, ¿no?`;
        break;
      default:
        info = $localize`Esto está por defecto`;
        break;
    }

    return info;
  }
}
