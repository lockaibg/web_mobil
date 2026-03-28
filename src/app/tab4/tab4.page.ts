import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie, SerieService } from '../service/serie';
import { Film } from '../service/film';
import { Episode, EpisodeService } from '../service/episode';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from '../BDD/UneSerie';
import {Bddfilms} from "../BDD/BDDFilms";
import { AddedService } from '../service/added.service';
import { WatchedService } from '../service/watched.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  listed!: boolean;
  status!: string;
  elem: UnFilm | UneSerie ;
  private type : string = '';

  constructor(private router: Router, private episodeService: EpisodeService,private bddfilms: Bddfilms, private addedService: AddedService, private watchedService: WatchedService) {
    const navigation = this.router.currentNavigation();
    this.elem = navigation?.extras.state?.['elem'] ?? null;
    this.type = navigation?.extras.state?.['type'] ?? '';
    const id = this.elem?.id ?? null;
    addedService.isAdded(id) ? this.listed = true : this.listed = false;
    watchedService.isWatched(id) ? this.status = 'VUE' : this.status = 'NOT';
  }

  ionViewWillEnter() {
    this.setupPage();
  }

   setupPage(): void {
     if(this.elem) {
       if (this.type === 'film') {
         this.bddfilms.getDetailsFilm(this.elem.id).subscribe(contenu => {
           Object.assign(this.elem, contenu);

         });
       } else {
         this.bddfilms.getDetailsSerie(this.elem.id).subscribe(contenu => {
           Object.assign(this.elem, contenu);

         });
       }

     }
   }




  isSerie(elem: any): elem is UneSerie {
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

  getTotalDuration(serie: UneSerie): number {
    //TODO get total duration from serie
    //return this.bddfilms.getTotalDuration(serie);
    return 10;
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

  addToList(elem: UnFilm | UneSerie) {
    if(this.listed) {
      this.listed = false;
      this.addedService.removeAdded(elem.id);
    } else {
      this.listed = true;
      this.addedService.addAdded(elem.id);
    }
  }

  changeStatus(elem: any) {
    if(this.status === 'NOT') {
      this.status = 'EN_COURS';
      this.watchedService.addWatched(elem.id);
    } else if (this.status === 'EN_COURS') {
      this.status = 'VUE';
    } else {
      this.status = 'NOT';
      this.watchedService.removeWatched(elem.id);
    }
}

}
