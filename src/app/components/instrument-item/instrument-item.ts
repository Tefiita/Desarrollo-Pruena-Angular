import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrument-item.html',
  styleUrl: './instrument-item.css',
  template:`<div class="instrument-item">Nombre instrumento - Valor</div>`
})
export class InstrumentItem {

}
