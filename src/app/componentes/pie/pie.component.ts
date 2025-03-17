import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  imports: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {
  anyo: number = new Date().getFullYear();  //variable que saca el año actual
}
