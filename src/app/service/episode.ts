import { Injectable } from '@angular/core';
import { Serie } from './serie';

export interface Episode {
  serie: Serie;
  duree?: number;
  numero: number;
  saison: number;
  vue: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  public episode: Episode[] = [
    {
      serie: {
        episodes: [],
        title: "The Witcher",
        realisateur: "real",
        acteur: "michel polnaref",
        genre: "aventure",
        synopsis: "un gars qui se balade avec une petite fille",
        poster_path: "https://fr.web.img6.acsta.net/pictures/19/11/27/15/09/4719139.jpg",
        release_date: new Date("2019-12-20")
      },
      duree: 34,
      numero: 8,
      saison: 1,
      vue: true,

    }
  ];

  constructor() { }

  public getMessages(): Episode[] {
    return this.episode;
  }

  public getEpisode(numero: number, saison: number, serie: string): Episode | undefined {
    return this.episode.find(m => m.numero === numero && m.saison === saison && m.serie.title === serie);
  }

  public getPoster(episode: Episode): string {
    //TODO get poster from serie
    return 'https://fr.web.img6.acsta.net/pictures/19/11/27/15/09/4719139.jpg';
  }
}
