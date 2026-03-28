import { Injectable } from '@angular/core';

export interface Film {
  name: string,
  realisateur: string,
  acteur: string,
  genre: string,
  synopsis: string,
  posterUrl: string,
  duree: number
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
        synopsis: "un gaqzfille",
        posterUrl: "https://fr.web.img6.acsta.net/pictures/19/11/27/15/09/4719139.jpg",
        duree: 120
      }
    ]
    public getMessages(): Film[] {
      return this.film;
    }
  
    public getSerie(name: string) {
      return this.film.find(m => m.name === name);
    }
}
