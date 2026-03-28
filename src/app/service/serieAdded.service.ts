import { Injectable } from '@angular/core';
import { UneSerie } from '../BDD/UneSerie';

@Injectable({ providedIn: 'root' })
export class SeriesAddedService {

  private readonly STORAGE_KEY = 'added_series';
  private AddedSeries: number[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.AddedSeries = parsed.map((obj: any) => new UneSerie(obj));
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.AddedSeries));
  }

  add(elem: number) {
    const exists = this.AddedSeries.find(f => f === elem);
    if (!exists) {
      this.AddedSeries.push(elem);
      this.save();
    }
  }

  remove(elem: number) {
    this.AddedSeries = this.AddedSeries.filter(f => f !== elem);
    this.save();
  }

  get(): number[] {
    return this.AddedSeries;
  }

  isAdded(elem: number): boolean {
    return this.AddedSeries.some(f => f === elem);
  }
}
