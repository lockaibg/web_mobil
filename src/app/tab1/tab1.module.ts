import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { EpisodeComponent } from "../episode/episode.component";

import { CardUnFilmComponent} from "../card-un-film/card-un-film.component";
import {ListeFilmsComponent} from "../liste-films/liste-films.component";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    Tab1Page,
    EpisodeComponent ,
    CardUnFilmComponent,
    ListeFilmsComponent
  ]
})
export class Tab1PageModule {}
