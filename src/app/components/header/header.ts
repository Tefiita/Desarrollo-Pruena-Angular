import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  summary: any;

  private _codeInstrument!: string;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  @Input()
  set codeInstrument(value: string) {
    if (value) {
      this._codeInstrument = value;
      this.loadInstrument(value);
    }
  }

  loadInstrument(code: string) {
    this.dataService.getSummary(code).subscribe({
      next: (res) => {
        this.summary = res.data;
        // Marca el componente para detectar cambios de inmediato
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando summary', err),
    });
  }

  getClass(tend: string): string {
    if (tend === 'up') return 'positive';
    if (tend === 'down') return 'negative';
    return '';
  }
}
