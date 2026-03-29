import {Component, Input, OnInit} from '@angular/core';
import {UnFilm} from "../BDD/UnFilm";
import {UneSerie} from "../BDD/UneSerie";
import {CardUnFilmComponent} from "../card-un-film/card-un-film.component";
import {CardUneSerieComponent} from "../card-une-serie/card-une-serie.component";
import {Tab1PageModule} from "../tab1/tab1.module";
import {state} from "@angular/animations";
import {Router} from "@angular/router";
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],

})
export class ListCardComponent{
  @Input() title: string = '';
  @Input() items: (UnFilm|UneSerie)[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  goToDetails(item: UnFilm | UneSerie) {
    this.dataService.setData(item);
    this.router.navigate(['/tabs/tab4']);
  }
}
