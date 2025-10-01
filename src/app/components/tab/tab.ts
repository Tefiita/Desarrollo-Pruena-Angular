import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <button *ngFor="let index of indices">{{ index }}</button>
    </div>
  `
})
export class Tab {
  indices = ['IPSA', 'IGPA', 'NASDAQ'];
}

