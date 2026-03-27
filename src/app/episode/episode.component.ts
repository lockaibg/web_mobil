import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Episode } from '../service/episode';
import { ChangeDetectionStrategy } from '@angular/core';
import { inject } from '@angular/core';


@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
    standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeComponent  {
  private platform = inject(Platform);
  @Input() episode?: Episode;
  isIos() {
    return this.platform.is('ios')
  }
}
