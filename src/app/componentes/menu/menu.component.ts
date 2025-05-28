import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(public location: Location) {}

  //arrays con rutas para comprobar en qué tipo de ruta estamos y cambiar el estilo
  arraiRutProd = ['/nuevo-prod', '/ver-prod'];
  arraiRutCat = ['/nueva-cat', '/ver-cat'];
  arraiRutCaPr = ['/nuevo-cat-prod', '/ver-cat-prod'];
  arraiRutUsu = ['/mi-cuenta', '/nuevo-usuario'];
  arraiRutUsuPr = ['/resenya', '/comprar', '/loteria'];

  /**
   * Función que da un mensaje de información de la página en función de la ruta actual
   * @returns Mensaje de ayuda de la página
   */
  infoPag(): string {  
    let info: string = '';
    switch (this.location.path()) {
      case '/nuevo-prod':
        info = $localize`Aquí puedes añadir nuevos productos. Tienen nombres únicos y obviamente su precio no puede ser igual o inferior a 0.`;
        break;
      case '/nueva-cat':
        info = $localize`Aquí puedes añadir nuevas categorías de productos. Tienen nombres únicos.`;
        break;
      case '/ver-prod':
        info = $localize`Aquí puedes ver los productos actuales. Puedes modificarlos y eliminarlos si eres administrador.`;
        break;
      case '/ver-cat':
        info = $localize`Aquí puedes ver las categorías disponibles de productos y eliminarlas si eres administrador.`;
        break;
      case '/nuevo-cat-prod':
        info = $localize`Aquí puedes conectar categorías con productos.`;
        break;
      case '/ver-cat-prod':
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
    }

    return info;
  }
}
