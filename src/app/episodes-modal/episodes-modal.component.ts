import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WatchedService } from '../service/watched.service';
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
    private watchedService: WatchedService,
    private onGoingService: OnGoingService
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  private getNumeroGlobal(saisonCible: number, numeroEpisode: number): number {
    let numeroAbsolu = 0;

    for (const saison of this.saisons) {
      if (saison.numero < saisonCible) {
        // On additionne tous les épisodes des saisons précédentes
        numeroAbsolu += saison.episodes.length;
      } else if (saison.numero === saisonCible) {
        // On est dans la bonne saison, on ajoute le numéro de l'épisode et on s'arrête
        numeroAbsolu += numeroEpisode;
        break;
      }
    }
    return numeroAbsolu;
  }

  isWatched(ep: { saison: number, numero: number }): boolean {
    if (this.watchedService.isWatched(this.id_serie, 'serie')) {
      return true;
    }
    else if (!this.onGoingService.isOnGoing(this.id_serie, 'serie')) {
      return false;
    } else {
        const numeroGlobal = this.getNumeroGlobal(ep.saison, ep.numero);
        return this.onGoingService.isEpisodeWatched(this.id_serie, numeroGlobal);
      }
  }

  epAdd(numero: number, saison: number) {
    const epParSaison = this.saisons[0]?.episodes.length ?? 0;
    const numeroGlobal = this.getNumeroGlobal(saison, numero);
    const totalEpisodes = this.saisons.reduce((acc, s) => acc + s.episodes.length, 0);

    if (!this.onGoingService.isOnGoing(this.id_serie, 'serie')) {
      this.onGoingService.add(this.id_serie, 'serie');
    }

    this.onGoingService.addWatchedEpisode(this.id_serie, numeroGlobal);
  }

  epRemove(numero: number, saison: number) {
    const epParSaison = this.saisons[0]?.episodes.length ?? 0;
    const numeroGlobal = this.getNumeroGlobal(saison, numero);
    const totalEpisodes = this.saisons.reduce((acc, s) => acc + s.episodes.length, 0);
    this.onGoingService.removeWatchedEpisode(this.id_serie, numeroGlobal, totalEpisodes);
  }
}
