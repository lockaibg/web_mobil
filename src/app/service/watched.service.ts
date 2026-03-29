import { Injectable } from '@angular/core';
import { SavedMedia} from "../BDD/SavedMedia";

@Injectable({ providedIn: 'root' })
export class WatchedService {

  private readonly STORAGE_KEY = 'watched_media';
  private watchedList: SavedMedia[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.watchedList = JSON.parse(data);
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.watchedList));
  }

  add(id: number, type: 'film' | 'serie') {
    const exists = this.watchedList.find(item => item.id === id && item.type === type);

    if (!exists) {
      this.watchedList.push({ id, type });
      this.save();
    }
  }

  remove(id: number, type: 'film' | 'serie') {
    this.watchedList = this.watchedList.filter(item => !(item.id === id && item.type === type));
    this.save();
  }

  get(): SavedMedia[] {
    return this.watchedList;
  }

  isWatched(id: number, type: 'film' | 'serie'): boolean {
    return this.watchedList.some(item => item.id === id && item.type === type);
  }
}
