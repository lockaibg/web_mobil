import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeComponent } from '../episode/episode.component';
import { Episode } from '../service/episode';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  episode: Episode;

  constructor(private router: Router) {
    const navigation = this.router.currentNavigation();
    this.episode = navigation?.extras.state?.['episode'];
  }

}
