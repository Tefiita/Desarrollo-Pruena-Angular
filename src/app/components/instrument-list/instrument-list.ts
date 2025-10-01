import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './instrument-list.html',
  styleUrls: ['./instrument-list.css'],
})
export class InstrumentList implements OnInit {
  instruments: any[] = [];
  leftInstruments: any[] = [];
  rightInstruments: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getConstituents().subscribe((res: any) => {
      this.instruments = res.data.constituents;

      const mid = Math.ceil(this.instruments.length / 2);
      this.leftInstruments = this.instruments.slice(0, mid);
      this.rightInstruments = this.instruments.slice(mid);
    });
  }

  readonly EPSILON = 0.0001;

  getClass(value: number): string {
    if (value > this.EPSILON) return 'positive';
    if (value < -this.EPSILON) return 'negative';
    return '';
  }

  formatValue(value: number): string {
    const EPSILON = 0.0001;
    if (value > EPSILON) return `+${value.toFixed(2)}%`;
    if (value < -EPSILON) return `${value.toFixed(2)}%`;
    return `0,00`;
  }
}
