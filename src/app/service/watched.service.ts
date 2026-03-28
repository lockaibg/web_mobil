import { Injectable } from '@angular/core';
import { UnFilm } from '../BDD/UnFilm';

@Injectable({ providedIn: 'root' })
export class WatchedService {

  private readonly STORAGE_KEY = 'watched_films';
  private watchedFilms: number[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.watchedFilms = parsed.map((obj: any) => new UnFilm(obj));
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.watchedFilms));
  }

  addWatched(elem: number) {
    const exists = this.watchedFilms.find(f => f === elem);
    if (!exists) {
      this.watchedFilms.push(elem);
      this.save();
    }
  }

  removeWatched(elem: number) {
    this.watchedFilms = this.watchedFilms.filter(f => f !== elem);
    this.save();
  }

  getWatched(): number[] {
    return this.watchedFilms;
  }

  isWatched(elem: number): boolean {
    return this.watchedFilms.some(f => f === elem);
  }
}