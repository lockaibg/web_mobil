import { Injectable } from '@angular/core';
import { Episode } from './episode'

export interface Serie {
  episodes: Episode[],
  name: string,
  realisateur: string,
  acteur: string,
  genre: string,
  synopsis: string
}
@Injectable({
  providedIn: 'root',
})
export class SerieService {
  //TODO importer les datas
  public serie: Serie[] = [
    {
      episodes: [],
      name: "the witcher",
      realisateur: "real",
      acteur: "michel polnaref",
      genre: "aventure",
      synopsis: "un gars qui se balade avec une petite fille"
    }
  ]
  public getMessages(): Serie[] {
    return this.serie;
  }

  public getSerie(name: string) {
    return this.serie.find(m => m.name === name);
  }
}
