import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { CardUnFilmComponent} from "../card-un-film/card-un-film.component";
import {ListeFilmsComponent} from "../liste-films/liste-films.component";
import { StatsComponent } from '../stats/stats.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        CardUnFilmComponent
    ],
    declarations: [
        Tab1Page,
        CardUnFilmComponent,
        ListeFilmsComponent,
        StatsComponent
    ]
})
export class Tab1PageModule {}
