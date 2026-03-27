import { Injectable } from '@angular/core';

export interface Film {
  name: string,
  realisateur: string,
  acteur: string,
  genre: string,
  synopsis: string
}

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  public film: Film[] = [
      {
        name: "edeg",
        realisateur: "real",
        acteur: "michel polnaref",
        genre: "aventure",
        synopsis: "un gaqzfille"
      }
    ]
    public getMessages(): Film[] {
      return this.film;
    }
  
    public getSerie(name: string) {
      return this.film.find(m => m.name === name);
    }
}
