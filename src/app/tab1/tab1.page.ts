import {ChangeDetectorRef, Component} from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UnFilm} from "../BDD/UnFilm";
import {UneSerie} from "../BDD/UneSerie";
import {AddedService} from "../service/added.service";
import {WatchedService} from "../service/watched.service";
import {Bddfilms} from "../BDD/BDDFilms";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  recherche: string = '';
  myForm: FormGroup;

  refreshStats: number = 0; // pas sur de savoir a quoi ça sert mais en gros c'est pour forcer le rafraichissement de la page quand on ajoute un film ou une série

  recemmentAjoute: (UnFilm | UneSerie)[] = [];
  recemmentVu: (UnFilm | UneSerie)[] = [];

  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private addedService: AddedService,
              private watchedService: WatchedService,
              private bddFilms: Bddfilms
  ) {
    this.myForm = this.fb.group({text: ['']});
  }

  ionViewWillEnter() {
    this.refreshStats++;
    this.chargerRecemmentAjoute();
    this.chargerRecemmentVu();
  }


  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.cdr.detectChanges();
  }

  private chargerRecemmentAjoute() {
    const medias = this.addedService.get().slice(-5).reverse();
    this.recemmentAjoute = [];

    for (const media of medias) {
      if (media.type === 'film') {
        this.bddFilms.getDetailsFilm(media.id).subscribe((film: UnFilm) => {
          this.recemmentAjoute.push(film);
          this.cdr.detectChanges();
        });
      } else {
        this.bddFilms.getDetailsSerie(media.id).subscribe((serie: UneSerie) => {
          this.recemmentAjoute.push(serie);
          this.cdr.detectChanges();
        });
      }
    }
  }

  private chargerRecemmentVu() {
    const medias = this.watchedService.get().slice(-5).reverse();
    this.recemmentVu = [];

    for (const media of medias) {
      if (media.type === 'film') {
        this.bddFilms.getDetailsFilm(media.id).subscribe((film: UnFilm) => {
          this.recemmentVu.push(film);
          this.cdr.detectChanges();
        });
      } else {
        this.bddFilms.getDetailsSerie(media.id).subscribe((serie: UneSerie) => {
          this.recemmentVu.push(serie);
          this.cdr.detectChanges();
        });
      }
    }
  }
}
