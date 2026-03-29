import {ChangeDetectorRef, Component, DestroyRef, inject,
  Input, OnChanges, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Bddfilms} from '../BDD/BDDFilms';
import {UnFilm} from '../BDD/UnFilm';
import {Router} from '@angular/router';
import {UneSerie} from "../BDD/UneSerie";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-liste-films',
  standalone: false,
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.scss'],
})

export class ListeFilmsComponent implements OnInit, OnChanges {
  @Input() recherche!: string;
  @Input() idGenre!:number[];
  @Input() trending!:number;
  listeFilms: UnFilm[] = [];
  listeSeries: UneSerie[] = [];
  listeMixte: (UnFilm| UneSerie)[] = [];
  private destroyRef = inject(DestroyRef);

  private apiKey = "e9a97e2e731b2968cddc7c13647130fe"; // ma cle api


  router = inject(Router);

  constructor(private bddFilms: Bddfilms,
              private cdr: ChangeDetectorRef,
              private dataService: DataService
  ) {}

  ngOnInit() {if(this.trending){this.afficherTendances(this.trending);}
  }

  ngOnChanges() { if(this.recherche !='') this.lancerRechercheMixte();
    else{this.voirGenre(this.idGenre);}}

  initListeFilms() {
    const urlFilms = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.recherche}`;
    return this.bddFilms.importFilms(urlFilms);
  }

  initListeSeries() {
  const urlSeries = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&query=${this.recherche}`;
  return this.bddFilms.importSeries(urlSeries)
  }

  lancerRechercheMixte() {
    // On lance les deux requêtes en même temps
    this.listeMixte = [];
    forkJoin({
     films: this.initListeFilms(),
     series: this.initListeSeries()
    }).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({films, series}) => {
        this.listeSeries = series;
        this.listeFilms = films;
        const fusion = [...this.listeFilms, ...this.listeSeries];

        this.listeMixte = fusion.sort((a, b) => {
          const noteA = a.popularity|| 0;
          const noteB = b.popularity || 0;
          return noteB - noteA;
      });

        this.cdr.detectChanges();
      });

  }

  goToFilm(elem: UnFilm| UneSerie) {
    this.dataService.setData(elem);
    this.router.navigate(['/tabs/tab4']);
  }

  isSerie(elem: any): elem is UneSerie{
    return elem && 'nbSaisons' in elem;
  }
  isFilm(elem: any):elem is UnFilm{
    return elem && !('nbSaisons' in elem);
  }

  voirGenre(genre: number[]) {
    this.listeMixte = [];

    forkJoin({
      films: this.bddFilms.decouvrirFilms(genre[0]),
      series: this.bddFilms.decouvrirSeries(genre[1])
    }).subscribe(({ films, series }) => {

      const fusion = [...films, ...series];

      this.listeMixte = fusion.sort((a, b) => b.popularity - a.popularity).slice(0, 50);

      this.cdr.detectChanges();
    });
  }

  afficherTendances(type:number){
    this.bddFilms.getTendances(type).subscribe(films =>{
      this.listeMixte = films.slice(0,10);
    });
  }

}
