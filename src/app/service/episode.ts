import { Injectable } from '@angular/core';

export interface Episode {
  fromName: string;
  duree: number;
  numero: number;
  saison: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  public episode: Episode[] = [
    {
      fromName: 'The Witcher',
      numero: 8,
      saison: 1,
      read: true,
      duree: 34
    },
    {
      fromName: 'The Witcher',
      numero: 8,
      saison: 2,
      read: false,
      duree: 35
    }
  ];

  constructor() { }

  public getMessages(): Episode[] {
    return this.episode;
  }

  public getEpisode(numero: number, saison: number, serie: string): Episode | undefined {
    return this.episode.find(m => m.numero === numero && m.saison === saison && m.fromName === serie);
  }
}
