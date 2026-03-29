import { Injectable } from '@angular/core';
import { SerieWatchedService } from './serieWatched.service';

interface OnGoingSerie {
  id: number;
  totalEpisodes: number;
  watchedEpisodes: number[];
}

@Injectable({ providedIn: 'root' })
export class OnGoingService {

  private readonly STORAGE_KEY = 'onGoing_series';
  private onGoingSeries: OnGoingSerie[] = [];

  constructor(private serieWatchedService: SerieWatchedService) {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.onGoingSeries = JSON.parse(data);
    }
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.onGoingSeries));
  }

  add(id: number, totalEpisodes: number) {
    const exists = this.onGoingSeries.find(s => s.id === id);
    if (!exists) {
      this.onGoingSeries.push({ id, totalEpisodes, watchedEpisodes: [] });
      this.save();
    }
  }

  remove(id: number) {
    this.onGoingSeries = this.onGoingSeries.filter(s => s.id !== id);
    this.save();
  }

  get(): OnGoingSerie[] {
    return this.onGoingSeries;
  }

  isOnGoing(id: number): boolean {
    return this.onGoingSeries.some(s => s.id === id);
  }

  addWatchedEpisode(serieId: number, episode: number) {
    const serie = this.onGoingSeries.find(s => s.id === serieId);
    if (serie) {
      if (!serie.watchedEpisodes.includes(episode)) {
        serie.watchedEpisodes.push(episode);
        this.save();
      }
      if (this.isFullyWatched(serieId)) {
        this.serieWatchedService.add(serieId);
        this.remove(serieId);
      }
    }
  }

  isEpisodeWatched(serieId: number, episode: number): boolean {
    const serie = this.onGoingSeries.find(s => s.id === serieId);
    return serie?.watchedEpisodes.includes(episode) ?? false;
  }

  isFullyWatched(serieId: number): boolean {
    const serie = this.onGoingSeries.find(s => s.id === serieId);
    if (!serie) return false;
    return serie.watchedEpisodes.length === serie.totalEpisodes;
  }

  removeWatchedEpisode(serieId: number, episode: number, totalEpisodes: number) {
    let serie = this.onGoingSeries.find(s => s.id === serieId);

    if (!serie) {
      const allEpisodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1)
                              .filter(ep => ep !== episode);
      if (allEpisodes.length === 0) {
        this.serieWatchedService.remove(serieId);
      } else {
        this.onGoingSeries.push({ id: serieId, totalEpisodes, watchedEpisodes: allEpisodes });
        this.serieWatchedService.remove(serieId);
      }
    } else {
      serie.watchedEpisodes = serie.watchedEpisodes.filter(ep => ep !== episode);
      if (serie.watchedEpisodes.length === 0) {
        this.remove(serieId);
        return;
      }
    }
    this.save();
  }
}