import { Injectable } from '@angular/core';
import { SavedMedia} from "../BDD/SavedMedia";

@Injectable({ providedIn: 'root' })
export class OnGoingService {

  private readonly STORAGE_KEY = 'on_going_media';
  private onGoingList: SavedMedia[] = [];

  constructor() {
    this.load(); // Charger au démarrage
  }

  // Charger depuis localStorage
  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.onGoingList = JSON.parse(data);
    }
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.onGoingList));
  }

  add(id: number, type: 'film' | 'serie') {
    const exists = this.onGoingList.find(item => item.id === id && item.type === type);

    if (!exists) {
      this.onGoingList.push({ id, type });
      this.save();
    }
  }

  remove(id: number, type: 'film' | 'serie') {
    this.onGoingList = this.onGoingList.filter(item => !(item.id === id && item.type === type));
    this.save();
  }

  get(): SavedMedia[] {
    return this.onGoingList;
  }

  isOnGoing(id: number, type: 'film' | 'serie'): boolean {
    return this.onGoingList.some(item => item.id === id && item.type === type);
  }

  isEpisodeWatched(id_serie: number, numeroGlobal: number) {
    const media = this.onGoingList.find(item => item.id === id_serie && item.type === 'serie');
    if (media && media.episodesVus) {
      return media.episodesVus.includes(numeroGlobal);
    }
    return false;
  }

  addWatchedEpisode(id_serie: number, numeroGlobal: number) {
    const media = this.onGoingList.find(item => item.id === id_serie && item.type === 'serie');

    if (media) {
      if (!media.episodesVus) {
        media.episodesVus = [];
      }
      if (!media.episodesVus.includes(numeroGlobal)) {
        media.episodesVus.push(numeroGlobal);
        this.save();
      }
    }
  }

  removeWatchedEpisode(id_serie: number, numeroGlobal: number, totalEpisodes: number) {
    const media = this.onGoingList.find(item => item.id === id_serie && item.type === 'serie');

    if (media && media.episodesVus) {
      media.episodesVus = media.episodesVus.filter(ep => ep !== numeroGlobal);

      if (media.episodesVus.length === 0) {
        this.remove(id_serie, 'serie');
      } else {
        this.save();
      }
    }
  }
}
