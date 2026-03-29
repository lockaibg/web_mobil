import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ListeSeriesComponent} from "../liste-series/liste-series.component";
import {CardUneSerieComponent} from "../card-une-serie/card-une-serie.component";
import {Tab1PageModule} from "../tab1/tab1.module";
import {ListCardComponent} from "../list-card/list-card.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
    Tab1PageModule,
    ListCardComponent
  ],
  declarations: [Tab2Page,
  ListeSeriesComponent,
  CardUneSerieComponent]
})
export class Tab2PageModule {}
