import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../service/serie';
import { Film } from '../service/film';
import { Episode } from '../service/episode';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  elem: Serie | Film | Episode | null = null;

  constructor(private router: Router) {
    const navigation = this.router.currentNavigation();
    this.elem = navigation?.extras.state?.['elem'] ?? null;
  }

  isSerie(elem: any): elem is Serie {
    return elem && 'episodes' in elem;
  }

  isFilm(elem: any): elem is Film {
    return elem && !('episodes' in elem) && !('numero' in elem);
  }

  isEpisode(elem: any): elem is Episode {
    return elem && 'numero' in elem;
  }

  getTitle(elem: any): string {
    return elem?.name ?? elem?.fromName ?? '';
  }

  SeeEpisodes(elem: any) {
    // Implementation for seeing episodes
  }

  addToList(elem: any) {
    // Implementation for adding to list
  }

  changeStatus(elem: any) {
    // Implementation for changing status
  }

}
