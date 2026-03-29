import { Injectable } from '@angular/core';
import { UnFilm } from '../BDD/UnFilm';

@Injectable({ providedIn: 'root' })
export class AddedService {

  private readonly STORAGE_KEY = 'added_films';
  private AddedFilms: number[] = [];
  
  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.AddedFilms = parsed.map((obj: any) => new UnFilm(obj));
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.AddedFilms));
  }

  add(elem: number) {
    const exists = this.AddedFilms.find(f => f === elem);
    if (!exists) {
      this.AddedFilms.push(elem);
      this.save();
    }
  }

  remove(elem: number) {
    this.AddedFilms = this.AddedFilms.filter(f => f !== elem);
    this.save();
  }

  get(): number[] {
    return this.AddedFilms;
  }

  isAdded(elem: number): boolean {
    return this.AddedFilms.some(f => f === elem);
  }
}
