import {ChangeDetectorRef, Component, DestroyRef, inject,
  Input, OnChanges, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Bddfilms} from '../BDD/BDDFilms';
import {UnFilm} from '../BDD/UnFilm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-films',
  standalone: false,
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.scss'],
})

export class ListeFilmsComponent implements OnInit, OnChanges {
  @Input() recherche!: string;
  listeFilms: UnFilm[] = [];
  private destroyRef = inject(DestroyRef);

  router = inject(Router);

  constructor(private bddFilms: Bddfilms, private cdr: ChangeDetectorRef) {}

  ngOnInit() {this.initListeFilms();
  }

  ngOnChanges() { this.initListeFilms(); }

  initListeFilms() {
    const apiKey = "e9a97e2e731b2968cddc7c13647130fe"; // ma cle api
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.recherche}`;

    this.bddFilms.importFilms(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(films => {
        this.listeFilms = films;
        this.cdr.detectChanges();
      });
  }

  goToFilm(film: UnFilm) {
    this.router.navigate(['/tabs/tab4'], {
      state: { elem: film, type: 'film'}
    });
  }

}
