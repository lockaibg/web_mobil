import { Injectable } from '@angular/core';
import { SavedMedia} from "../BDD/SavedMedia";

@Injectable({ providedIn: 'root' })
export class AddedService {

  private readonly STORAGE_KEY = 'added_media';
  private addedList: SavedMedia[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.addedList = JSON.parse(data);
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.addedList));
  }

  add(id: number, type: 'film' | 'serie') {
    const exists = this.addedList.find(item => item.id === id && item.type === type);

    if (!exists) {
      this.addedList.push({ id, type });
      this.save();
    }
  }

  remove(id: number, type: 'film' | 'serie') {
    this.addedList = this.addedList.filter(item => !(item.id === id && item.type === type));
    this.save();
  }

  get(): SavedMedia[] {
    return this.addedList;
  }

  isAdded(id: number, type: 'film' | 'serie'): boolean {
    return this.addedList.some(item => item.id === id && item.type === type);
  }
}
