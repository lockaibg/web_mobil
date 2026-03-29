import {Component, Input, OnInit} from '@angular/core';
import {UnFilm} from "../BDD/UnFilm";
import {UneSerie} from "../BDD/UneSerie";
import {CardUnFilmComponent} from "../card-un-film/card-un-film.component";
import {CardUneSerieComponent} from "../card-une-serie/card-une-serie.component";
import {Tab1PageModule} from "../tab1/tab1.module";
import {state} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  imports: [
    Tab1PageModule
  ]
})
export class ListCardComponent{
  @Input() title: string = '';
  @Input() items: (UnFilm|UneSerie)[] = [];

  constructor(private router: Router) { }

  goToDetails(item: UnFilm | UneSerie) {
    this.router.navigate(['/tabs/tab4'], {
      state: { elem: item }
    });
  }
}
