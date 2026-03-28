import { Component, Input } from '@angular/core';
import { UnFilm } from '../BDD/UnFilm';

@Component({
  selector: 'app-card-un-film',
  standalone: false,
  templateUrl: './card-un-film.component.html',
  styleUrl: './card-un-film.component.scss'
})
export class CardUnFilmComponent {
  @Input() film!: UnFilm;
}
