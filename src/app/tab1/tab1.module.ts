import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { CardUnFilmComponent} from "../card-un-film/card-un-film.component";
import {ListeFilmsComponent} from "../liste-films/liste-films.component";
import { ListCardComponent } from "../list-card/list-card.component";
import { StatsComponent } from '../stats/stats.component';
import {ComponentsModule} from "../components.module";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
        ListCardComponent,
    ],

    declarations: [
        Tab1Page,
        StatsComponent
    ]
})
export class Tab1PageModule {}
