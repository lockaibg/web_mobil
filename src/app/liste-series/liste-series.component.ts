import {ChangeDetectorRef, Component, DestroyRef, inject,
  Input, OnChanges, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Bddfilms} from '../BDD/BDDFilms';
import {UneSerie} from '../BDD/UneSerie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-series',
  standalone: false,
  templateUrl: './liste-series.component.html',
  styleUrls: ['./liste-series.component.scss'],
})
export class ListeSeriesComponent implements OnInit, OnChanges {
  @Input() recherche!: string;
  listeSeries: UneSerie[] = [];
  private destroyRef = inject(DestroyRef);

  router = inject(Router);

  constructor(private bddFilms: Bddfilms, private cdr: ChangeDetectorRef) {}

  ngOnInit() {this.initListeFilms();
  }

  ngOnChanges() { this.initListeFilms(); }

  initListeFilms() {
    const apiKey = "e9a97e2e731b2968cddc7c13647130fe"; // ma cle api
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${this.recherche}`;

    this.bddFilms.importSeries(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(series => {
        this.listeSeries = series;
        this.cdr.detectChanges();
      });
  }

  goToSerie(serie:UneSerie) {
    this.router.navigate(['/tabs/tab4'], {
      state: { elem: serie.id, type: 'tv'}
    });
  }

}
