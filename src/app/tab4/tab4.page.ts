import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie, SerieService } from '../service/serie';
import { Film } from '../service/film';
import { Episode, EpisodeService } from '../service/episode';
import { UnFilm } from '../BDD/UnFilm';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  checkBox!: boolean;

  elem: Serie | UnFilm | Episode | null = null;

  constructor(private router: Router, private episodeService: EpisodeService, private serieService: SerieService) {
    const navigation = this.router.currentNavigation();
    this.elem = navigation?.extras.state?.['elem'] ?? null;

    if(this.elem && (this.isSerie(this.elem) || this.isFilm(this.elem))) {
      if(this.elem.listed) {
        this.checkBox = true;
      } else {
        this.checkBox = false;
      }
    }

    
  }

  isSerie(elem: any): elem is Serie {
    return elem && 'episodes' in elem;
  }

  isFilm(elem: any): elem is UnFilm {
    return elem && !('episodes' in elem) && !('numero' in elem);
  }

  isEpisode(elem: any): elem is Episode {
    return elem && 'numero' in elem;
  }

  getTitle(elem: any): string {
    return elem?.title ?? elem?.serie.title ?? '';
  }

  getTotalDuration(serie: Serie): number {
    return this.serieService.getTotalDuration(serie);
  }

  getPoster(elem: any): string {
    if (this.isEpisode(elem)) {
      return this.episodeService.getPoster(elem);
    }
    return elem?.posterUrl || 'assets/placeholder.jpg';
  }

  SeeEpisodes(elem: any) {
    // Implementation for seeing episodes
  }

  addToList(elem: UnFilm | Serie) {
    if(elem.listed) {
      elem.listed = false;
    } else {
      elem.listed = true;
    }
  }

  changeStatus(elem: any) {
    // Implementation for changing status
  }

}
