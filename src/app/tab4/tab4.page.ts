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
import { OnGoingService } from '../service/onGoing.service';
import { SeriesAddedService } from '../service/serieAdded.service';
import { SerieWatchedService } from '../service/serieWatched.service';
import { ModalController } from '@ionic/angular';
import { EpisodesModalComponent } from '../episodes-modal/episodes-modal.component';


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

  constructor(private router: Router, 
              private episodeService: EpisodeService,
              private bddfilms: Bddfilms, 
              private addedService: AddedService, 
              private watchedService: WatchedService,
              private serieWatchedService: SerieWatchedService,
              private seriesAddedService: SeriesAddedService,
              private onGoingService: OnGoingService,
              private modalController: ModalController) {

    const navigation = this.router.currentNavigation();
    this.elem = navigation?.extras.state?.['elem'] ?? null;
    this.type = navigation?.extras.state?.['type'] ?? '';
    const id = this.elem?.id ?? null;
    addedService.isAdded(id) ? this.listed = true : this.listed = false;
  }

  ionViewWillEnter() {
    this.setupPage();
    this.refreshStatus();
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
    return elem && 'nbEpisodes' in elem;
  }

  isFilm(elem: any): elem is UnFilm {
    return elem && !('nbEpisodes' in elem) && !('numero' in elem);
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

  async SeeEpisodes(elem: UneSerie) {
    const epParSaison = Math.ceil(elem.nbEpisodes / elem.nbSaisons);

    const saisons: { numero: number, episodes: { saison: number, numero: number }[] }[] = [];

    let epCount = 0;
    for (let s = 1; s <= elem.nbSaisons; s++) {
      const episodes = [];
      for (let e = 1; e <= epParSaison && epCount < elem.nbEpisodes; e++) {
        episodes.push({ saison: s, numero: e });
        epCount++;
      }
      saisons.push({ numero: s, episodes });
    }

    const modal = await this.modalController.create({
      component: EpisodesModalComponent,
      componentProps: { saisons, titre: elem.title, id_serie: elem.id }
    });

    await modal.present();

    await modal.onDidDismiss();
    this.refreshStatus();
  }

  addToList(elem: UnFilm | UneSerie) {
    if(this.listed) {
      this.listed = false;
      if(this.isFilm(elem)) {
        this.addedService.remove(elem.id);
      } else {
        this.seriesAddedService.remove(elem.id);
      }
    } else {
      if(this.isFilm(elem)) {
        this.addedService.add(elem.id);
      } else {
        this.seriesAddedService.add(elem.id);
      }
      this.listed = true;
    }
  }

  refreshStatus(): void {
  const id = this.elem?.id ?? null;
  if (this.isSerie(this.elem)) {
    if (this.serieWatchedService.isAdded(id)) {
      this.status = 'VUE';
    } else if (this.onGoingService.isOnGoing(id)) {
      this.status = 'EN_COURS';
    } else {
      this.status = 'NOT';
    }
  } else {
    this.watchedService.isWatched(id) ? this.status = 'VUE' : this.status = 'NOT';
  }
}

changeStatus(elem: any) {
  if (this.status === 'NOT') {
    if (this.isFilm(elem)) {
      this.watchedService.add(elem.id);
    } else {
      this.onGoingService.add(elem.id, elem.nbEpisodes);
    }
  } else if (this.status === 'EN_COURS') {
    this.onGoingService.remove(elem.id);
    this.serieWatchedService.add(elem.id);
  } else {
    if (this.isFilm(elem)) {
      this.watchedService.remove(elem.id);
    } else {
      this.serieWatchedService.remove(elem.id);
    }
  }
  this.refreshStatus();
}

}
