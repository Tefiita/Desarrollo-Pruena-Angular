import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { Header } from './components/header/header';
import { Chart } from './components/chart/chart';
import { SearchBar } from './components/search-bar/search-bar';
import { Summary } from './components/summary/summary';
import { InstrumentList } from './components/instrument-list/instrument-list';
import { InstrumentItem } from './components/instrument-item/instrument-item';
import { Tab } from './components/tab/tab';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, SearchBar, Chart, Summary, InstrumentList, InstrumentItem, Tab],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Desarrollo-Angular');

  currentInstrument = signal('IPSA');

  onSearch(query: string) {
    if(query){
      this.currentInstrument.set(query.toUpperCase());
    }
  }
}
