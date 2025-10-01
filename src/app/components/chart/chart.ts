import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../../services/data.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './chart.html',
  styleUrls: ['./chart.css'],
})
export class Chart {
  data: any = { labels: [], datasets: [] };
  options: any;
  type: 'line' | 'bar' | 'pie' | 'doughnut' = 'line';
  selectedPeriod: '1M' | '3M' | '6M' | '1A' = '1M';
  periods: ('1M' | '3M' | '6M' | '1A')[] = ['1M', '3M', '6M', '1A'];

  private _codeInstrument!: string;
  _summary: any;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10, 
          top: 10,
          bottom: 10,
        },
      },
      scales: {
        x: {
          ticks: { display: false },
          grid: { drawTicks: false, drawOnChartArea: true }, 
        },
        y: {
          beginAtZero: true,
          grid: {
            drawTicks: true,
            drawOnChartArea: true, 
            color: 'rgba(124, 123, 123, 0.3)',
            borderWidth: 1,
          },
        },
      },
    };
  }
  @Input()
  set codeInstrument(value: string) {
    if (value) {
      this._codeInstrument = value;
      this.loadInstrument(value);
    }
  }

  loadInstrument(code: string) {
    this.dataService.getInstrumentData(code).subscribe((result) => {
      const summary = result.Summary.data.info;
      const history = result.History.data.chart;
      this._summary = summary;

      const filteredHistory = this.filterByPeriod(history, this.selectedPeriod);

      this.data = {
        labels: filteredHistory.map((h: any) => h.datetimeLastPrice),
        datasets: [
          {
            label: summary.shortName,
            data: filteredHistory.map((h: any) => h.lastPrice),
            fill: true,
            backgroundColor: 'rgba(66, 165, 245, 0.5)',
            borderColor: '#42A5F5',
            tension: 0.4,
          },
        ],
      };
      this.cdr.detectChanges();
    });
  }

  private filterByPeriod(history: any[], period: '1M' | '3M' | '6M' | '1A'): any[] {
    if (!history || history.length === 0) return [];

    const timestamps = history.map((h) => h.datetimeLastPriceTs);
    const maxTs = Math.max(...timestamps);
    const minTs = Math.min(...timestamps);

    let fromTs = minTs;

    switch (period) {
      case '1M':
        fromTs = maxTs - 30 * 24 * 60 * 60;
        break;
      case '3M':
        fromTs = maxTs - 90 * 24 * 60 * 60;
        break;
      case '6M':
        fromTs = maxTs - 180 * 24 * 60 * 60;
        break;
      case '1A':
        fromTs = maxTs - 365 * 24 * 60 * 60;
        break;
    }
    return history.filter((h) => h.datetimeLastPriceTs >= fromTs);
  }

  setPeriod(period: '1M' | '3M' | '6M' | '1A') {
    this.selectedPeriod = period;
    if (this._codeInstrument) {
      this.loadInstrument(this._codeInstrument);
    }
  }
}
