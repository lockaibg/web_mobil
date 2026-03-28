import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, defaultIfEmpty } from 'rxjs/operators';
import { UnFilm } from './UnFilm';
import { UnePage } from './UnePage';

@Injectable({ providedIn: 'root' })
export class Bddfilms {
  listeFilms: UnFilm[] = [];

  constructor(private httpClient: HttpClient) {}

  public importFilms(requete: string): Observable<UnFilm[]> {
    this.listeFilms = [];

    let premierePage = this.httpClient.get<UnePage>(requete).pipe(
      tap(page => {

        page.results.forEach(item => {
          this.listeFilms.push(new UnFilm(item));
        });
      })
    );


    return premierePage.pipe(
      switchMap(page => {
        const length = page.total_pages - 1;

        const arr = Array.from({ length }, (_, i) => 2 + i);

        let obs = arr.map(id => this.httpClient.get<UnePage>(requete + "&page=" + id));

        return forkJoin(obs).pipe(
          defaultIfEmpty(null),
          map(res => {
            if (res != null) {

              res.forEach(p => {
                p.results.forEach(item => {
                  this.listeFilms.push(new UnFilm(item));
                });
              });
            }
            return this.listeFilms;
          })
        );
      })
    );
  }

  public getDetails(id:number): Observable<UnFilm> {
    const apiKey = "e9a97e2e731b2968cddc7c13647130fe";
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
    return this.httpClient.get<any>(url).pipe(map(data => {return new UnFilm(data);}));
  }


}
