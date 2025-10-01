import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css'],
})
export class Summary implements OnChanges {
  @Input() codeInstrument!: string;
  summary: any;
  activeTab: 'Resumen' | 'Detalles' = 'Resumen';

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.codeInstrument) {
      this.loadSummary(this.codeInstrument);
    }
  }

  private loadSummary(code: string) {
    this.dataService.getSummary(code).subscribe({
      next: (res) => {
        this.summary = res.data ?? res; 
        this.cdr.detectChanges();      
      },
      error: (err) => console.error('Error cargando summary', err),
    });
  }

  selectTab(tab: 'Resumen' | 'Detalles') {
    this.activeTab = tab;
  }

  getClass(tend: string): string {
    if (tend === 'up') return 'positive';
    if (tend === 'down') return 'negative';
    return '';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hour24, minute, second] = timePart.split(':').map(Number);
    const date = new Date(year, month - 1, day, hour24, minute, second);
    const ampm = date.getHours() >= 12 ? 'p.m.' : 'a.m.';
    const hour12 = date.getHours() % 12 || 12;
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(hour12).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${dd}/${mm}/${yy} ${hh}:${min}:${ss} ${ampm}`;
  }

  formatPercentage(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value?.toFixed(2)}%`;
  }

  getPercentageClass(value: number): string {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
  }
}
