import { Component, Input } from '@angular/core';
import { UneSerie } from '../BDD/UneSerie';

@Component({
  selector: 'app-card-une-serie',
  standalone: false,
  templateUrl: './card-une-serie.component.html',
  styleUrl: './card-une-serie.component.scss'
})
export class CardUneSerieComponent {
  @Input() serie!: UneSerie;
  constructor() {}
}

