import { Injectable } from '@angular/core';
import { UneSerie } from '../BDD/UneSerie';

@Injectable({ providedIn: 'root' })
export class SerieWatchedService {

  private readonly STORAGE_KEY = 'watched_series';
  private WatchedSeries: number[] = [];

  constructor() {
    this.load(); 
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.WatchedSeries = JSON.parse(data); 
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.WatchedSeries));
  }

  add(elem: number) {
    const exists = this.WatchedSeries.find(s => s === elem);
    if (!exists) {
      this.WatchedSeries.push(elem);
      this.save();
    }
  }

  remove(elem: number) {
    this.WatchedSeries = this.WatchedSeries.filter(s => s !== elem);
    this.save();
  }

  get(): number[] {
    return this.WatchedSeries;
  }

  isAdded(elem: number): boolean {
    return this.WatchedSeries.some(f => f === elem);
  }
}
