import { Injectable } from '@angular/core';
import { UneSerie } from "../BDD/UneSerie";

@Injectable({ providedIn: 'root' })
export class OnGoingService{

  private readonly STORAGE_KEY = 'onGoing_series';
  private onGoingSeries: number[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.onGoingSeries = parsed.map((obj: any) => new UneSerie(obj));
    }
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.onGoingSeries));
  }

  add(elem: number) {
    const exists = this.onGoingSeries.find(f => f === elem);
    if (!exists) {
      this.onGoingSeries.push(elem);
      this.save();
    }
  }

  remove(elem: number) {
    this.onGoingSeries = this.onGoingSeries.filter(f => f !== elem);
    this.save();
  }

  get(): number[] {
    return this.onGoingSeries;
  }

  isOnGoing(elem: number): boolean {
    return this.onGoingSeries.some(f => f === elem);
  }
}
