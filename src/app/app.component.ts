import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieComponent } from './componentes/pie/pie.component';
import { MenuComponent } from "./componentes/menu/menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PieComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SimulacionTienda';
}
