import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import { Bddfilms } from '../BDD/BDDFilms';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from "../BDD/UneSerie";

import { OnGoingService } from "../service/onGoing.service";
import { AddedService } from "../service/added.service";
import { WatchedService } from '../service/watched.service';


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
    const medias = this.addedService.get().filter(m => m.type === 'film');
    this.filmsAjoutes = [];

    for (const media of medias) {
      this.bddFilms.getDetailsFilm(media.id).subscribe((film: UnFilm) => {
        this.filmsAjoutes.push(film);
        this.cdr.detectChanges();
      });
    }
  }


  private chargerFilmsVus() {
    const medias = this.watchedService.get().filter(m => m.type === 'film');
    this.filmsVus = [];

    for (const media of medias) {
      this.bddFilms.getDetailsFilm(media.id).subscribe((film: UnFilm) => {
        this.filmsVus.push(film);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesEnCours() {
    const medias = this.onGoingService.get().filter(m => m.type === 'serie');
    this.seriesEnCours = [];

    for (const media of medias) {
      this.bddFilms.getDetailsSerie(media.id).subscribe((serie: UneSerie) => {
        this.seriesEnCours.push(serie);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesAjoutes() {
    const medias = this.addedService.get().filter(m => m.type === 'serie');
    this.seriesAjoutes = [];

    for (const media of medias) {
      this.bddFilms.getDetailsSerie(media.id).subscribe((serie: UneSerie) => {
        this.seriesAjoutes.push(serie);
        this.cdr.detectChanges();
      });
    }
  }

  private chargerSeriesVus() {
    const medias = this.watchedService.get().filter(m => m.type === 'serie');
    this.seriesVues = [];

    for (const media of medias) {
      this.bddFilms.getDetailsSerie(media.id).subscribe((serie: UneSerie) => {
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
