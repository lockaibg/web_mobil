import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { EpisodeService, Episode } from '../service/episode';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  private data = inject(EpisodeService);

  getMessages(): Episode[] {
    return this.data.getMessages();
  }
  constructor() {}

}
