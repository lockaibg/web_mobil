import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UnFilm } from '../BDD/UnFilm';
import { UneSerie } from '../BDD/UneSerie';
import {Bddfilms} from "../BDD/BDDFilms";
import { AddedService } from '../service/added.service';
import { WatchedService } from '../service/watched.service';
import { OnGoingService } from '../service/onGoing.service';
import { ModalController } from '@ionic/angular';
import { EpisodesModalComponent } from '../episodes-modal/episodes-modal.component';
import { DataService } from '../service/data.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  listed!: boolean;
  status!: string;
  elem!: UnFilm | UneSerie ;
  type: 'film' | 'serie' = 'film'; //Typage stricte pour éviter les erreurs

  constructor(private router: Router,
              private bddfilms: Bddfilms,
              private addedService: AddedService,
              private watchedService: WatchedService,
              private onGoingService: OnGoingService,
              private modalController: ModalController,
              private dataService: DataService
              )
  {
  }

  ionViewWillEnter() {
    const data = this.dataService.getData();

    if (data) {
      this.elem = data;
      this.type = this.isSerie(this.elem) ? 'serie' : 'film';
      this.listed = this.addedService.isAdded(this.elem.id, this.type);
      this.setupPage();
      this.refreshStatus();
    }
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
    return elem && ('nbEpisodes' in elem || 'nbSaisons' in elem);
  }

  isFilm(elem: any): elem is UnFilm {
    return elem && !this.isSerie(elem);
  }


  getTitle(elem: any): string {
    return elem?.title ?? '';
  }

  getPoster(elem: any): string {
    /*if (this.isEpisode(elem)) {
      return this.episodeService.getPoster(elem);
    }*/
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
    if (this.listed) {
      this.addedService.remove(elem.id, this.type);
      this.listed = false;
    } else {
      this.addedService.add(elem.id, this.type);
      this.listed = true;
    }
  }

  refreshStatus(): void {
  const id = this.elem?.id ?? null;
    if (!this.elem) return;
    if (this.type === 'serie') {
      if (this.watchedService.isWatched(this.elem.id, 'serie')) {
        this.status = 'VUE';
      } else if (this.onGoingService.isOnGoing(this.elem.id, 'serie')) {
        this.status = 'EN_COURS';
      } else {
        this.status = 'NOT';
      }
    } else {
      // C'est un film
      this.status = this.watchedService.isWatched(this.elem.id, 'film') ? 'VUE' : 'NOT';
    }
  }

  async changeStatus(elem: any) {
  await Haptics.impact({ style: ImpactStyle.Light });

  if (this.status === 'NOT') {
    this.watchedService.add(elem.id, this.type);
    this.status = 'VUE';

  } else if (this.status === 'EN_COURS') {
    this.onGoingService.remove(elem.id, 'serie');
    this.watchedService.add(elem.id, 'serie');
    this.status = 'VUE';
  } else {
    this.watchedService.remove(elem.id, this.type);
    this.status = 'NOT';
  }
}

}
