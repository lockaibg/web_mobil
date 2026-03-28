import { Injectable } from '@angular/core';
import { Episode } from './episode'

export interface Serie {
  episodes: Episode[],
  title: string,
  release_date: Date,
  poster_path: string,
  realisateur: string,
  acteur: string,
  genre: string,
  synopsis: string,
  duree?: number,
}
@Injectable({
  providedIn: 'root',
})
export class SerieService {
  //TODO importer les datas
  public serie: Serie[] = [
    {
      episodes: [],
      title: "The Witcher",
      realisateur: "real",
      acteur: "michel polnaref",
      genre: "aventure",
      synopsis: "un gars qui se balade avec une petite fille",
      poster_path: "https://fr.web.img6.acsta.net/pictures/19/11/27/15/09/4719139.jpg",
      release_date: new Date("2019-12-20"),
    }
  ]
  public getMessages(): Serie[] {
    return this.serie;
  }

  public getSerie(name: string) {
    return this.serie.find(m => m.title === name);
  }

  public getTotalDuration(serie: Serie): number {
    return serie.episodes.reduce((total, episode) => total + (episode.duree || 0), 0);
  }
}
