import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie, SerieService } from '../service/serie';
import { Film } from '../service/film';
import { Episode, EpisodeService } from '../service/episode';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from '../BDD/UneSerie';
import {Bddfilms} from "../BDD/BDDFilms";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  checkBox!: boolean;
  elem: UnFilm | UneSerie ;
  private type : string = '';

  constructor(private router: Router, private episodeService: EpisodeService,private bddfilms: Bddfilms) {
    const navigation = this.router.currentNavigation();
    this.elem = navigation?.extras.state?.['elem'] ?? null;
    this.type = navigation?.extras.state?.['type'] ?? '';
  }

  ionViewWillEnter() {
    this.setupPage();
  }


   /** if(this.elem && (this.isSerie(this.elem) || this.isFilm(this.elem))) {
      if(this.elem.listed) {
        this.checkBox = true;
      } else {
        this.checkBox = false;
      }**/

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

       if (this.elem.listed) {
         this.checkBox = true;
       } else {
         this.checkBox = false;
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
    if(elem.listed) {
      elem.listed = false;
    } else {
      elem.listed = true;
    }
  }

  changeStatus(elem: any) {
  if (this.isFilm(elem)) {
    // Film : NOT → EN_COURS → VUE → NOT
    if (elem.status === 'NOT') {
      elem.status = 'EN_COURS';
    } else if (elem.status === 'EN_COURS') {
      elem.status = 'VUE';
    } else {
      elem.status = 'NOT';
    }
  } else if (this.isSerie(elem) || this.isEpisode(elem)) {
    // Série / Épisode : NOT → VUE → NOT
    if (elem.status === 'NOT' || elem.status === 'EN_COURS') {
      elem.status = 'VUE';
    } else {
      elem.status = 'NOT';
    }
  }
}

}
