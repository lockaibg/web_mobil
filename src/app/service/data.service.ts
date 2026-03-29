import { Injectable } from '@angular/core';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from '../BDD/UneSerie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedItem: UnFilm | UneSerie | null = null;

  setData(item: UnFilm | UneSerie) {
    this.selectedItem = item;
  }

  getData() {
    return this.selectedItem;
  }
}
