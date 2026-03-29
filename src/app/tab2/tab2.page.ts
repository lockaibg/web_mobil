import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import { Bddfilms } from '../BDD/BDDFilms';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from "../BDD/UneSerie";

import { OnGoingService } from "../service/onGoing.service";
import { SeriesAddedService } from "../service/serieAdded.service";
import { AddedService } from "../service/added.service";
import { WatchedService } from '../service/watched.service';
import { SerieWatchedService } from '../service/serieWatched.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  recherche: string = '';
  myForm: FormGroup;

  switchPage: boolean = true; //true = séries, false = films

  seriesEnCours: UneSerie[] = [];
  seriesAjoutes: UneSerie[] = [];
  seriesVues: UneSerie[] = [];

  filmsVus: UnFilm[] = [];
  filmsAjoutes: UnFilm[] = [];



  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private onGoingService: OnGoingService,
    private seriesAddedService: SeriesAddedService,
    private seriesWatchedService: SerieWatchedService,
    private addedService: AddedService,
    private watchedService: WatchedService,
    private bddFilms: Bddfilms
  ) {
    this.myForm = this.fb.group({ text: [''] });
  }

  //Chargement des données à chaque fois qu'onarrive sur la page
  ionViewWillEnter() {
    this.chargerSeriesEnCours();
    this.chargerSeriesAjoutes();
    this.chargerSeriesVus();

    this.chargerFilmsAjoute();
    this.chargerFilmsVus();
  }

  chargerFilmsAjoute() {
    const ids = this.addedService.get();
    this.filmsAjoutes = [];
    for (const id of ids) {
      this.bddFilms.getDetailsFilm(id).subscribe((film: UnFilm) => {
        this.filmsAjoutes.push(film);
        this.cdr.detectChanges();
      });
    }
  }


  private chargerFilmsVus() {
    const ids = this.watchedService.get();
    this.filmsVus = [];
    for (const id of ids) {
      this.bddFilms.getDetailsFilm(id).subscribe((film: UnFilm) => {
        this.filmsVus.push(film);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesEnCours() {
    const ids = this.onGoingService.get()
    this.seriesEnCours = [];
    for (const id of ids) {
      this.bddFilms.getDetailsSerie(id.id).subscribe((serie: UneSerie) => {
        this.seriesEnCours.push(serie);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesAjoutes() {
    const ids = this.seriesAddedService.get()
    this.seriesAjoutes = [];
    for (const id of ids) {
      this.bddFilms.getDetailsSerie(id).subscribe((serie: UneSerie) => {
        this.seriesAjoutes.push(serie);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesVus() {
    const ids = this.seriesWatchedService.get()
    this.seriesVues = [];
    for (const id of ids) {
      this.bddFilms.getDetailsSerie(id).subscribe((serie: UneSerie) => {
        this.seriesVues.push(serie);
        this.cdr.detectChanges();
      });
    }
  }

  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.cdr.detectChanges();
  }

}
