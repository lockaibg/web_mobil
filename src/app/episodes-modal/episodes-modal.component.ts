import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SerieWatchedService } from '../service/serieWatched.service';
import { OnGoingService } from '../service/onGoing.service';

@Component({
  selector: 'app-episodes-modal',
  templateUrl: './episodes-modal.component.html',
  styleUrls: ['./episodes-modal.component.scss'],
  standalone: false
})
export class EpisodesModalComponent {
  @Input() saisons: { numero: number, episodes: { saison: number, numero: number }[] }[] = [];
  @Input() titre: string = '';
  @Input() id_serie!: number; 

  constructor(
    private modalController: ModalController,
    private serieWatchedService: SerieWatchedService,
    private onGoingService: OnGoingService
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  isWatched(ep: { saison: number, numero: number }): boolean {
    if (this.serieWatchedService.isAdded(this.id_serie)) {
      return true;
    }
    else if (!this.onGoingService.isOnGoing(this.id_serie)) {
      return false;
    } else {
        const epParSaison = this.saisons[0]?.episodes.length ?? 0;
        const numeroGlobal = (ep.saison - 1) * epParSaison + ep.numero;
        return this.onGoingService.isEpisodeWatched(this.id_serie, numeroGlobal);
    }
  }

  epAdd(numero: number, saison: number) {
    const epParSaison = this.saisons[0]?.episodes.length ?? 0;
    const numeroGlobal = (saison - 1) * epParSaison + numero;
    const totalEpisodes = this.saisons.reduce((acc, s) => acc + s.episodes.length, 0);

    if (!this.onGoingService.isOnGoing(this.id_serie)) {
        this.onGoingService.add(this.id_serie, totalEpisodes);
    }

    this.onGoingService.addWatchedEpisode(this.id_serie, numeroGlobal);
  }

  epRemove(numero: number, saison: number) {
    const epParSaison = this.saisons[0]?.episodes.length ?? 0;
    const numeroGlobal = (saison - 1) * epParSaison + numero;
    const totalEpisodes = this.saisons.reduce((acc, s) => acc + s.episodes.length, 0);
    this.onGoingService.removeWatchedEpisode(this.id_serie, numeroGlobal, totalEpisodes);
  }
}