import { Component, Input, OnChanges } from '@angular/core';
import { WatchedService } from '../service/watched.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  standalone: false
})
export class StatsComponent implements OnChanges {
  @Input() refresh: number = 0;

  nbFilms: number = 0;
  nbSeries: number = 0;
  total: number = 0;
  filmDeg: number = 0;
  serieDeg: number = 0;

  constructor(private watchedService: WatchedService) {}

  ngOnChanges() {
    this.loadStats();
  }

  loadStats() {
    const list = this.watchedService.get();
    this.nbFilms  = list.filter(item => item.type === 'film').length;
    this.nbSeries = list.filter(item => item.type === 'serie').length;
    this.total    = this.nbFilms + this.nbSeries;
    this.filmDeg  = this.total > 0 ? (this.nbFilms / this.total) * 360 : 0;
    this.serieDeg = 360 - this.filmDeg;
  }

  getPieGradient(): string {
    if (this.total === 0) return 'conic-gradient(#444 0deg 360deg)';
    return `conic-gradient(#e63946 0deg ${this.filmDeg}deg, #457b9d ${this.filmDeg}deg 360deg)`;
  }

  getPercent(n: number): string {
    if (this.total === 0) return '0%';
    return (n / this.total * 100).toFixed(1) + '%';
  }
}