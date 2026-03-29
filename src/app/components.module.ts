import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Importe tous tes composants ici
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { CardUnFilmComponent } from './card-un-film/card-un-film.component';
import { CardUneSerieComponent } from './card-une-serie/card-une-serie.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    ListeFilmsComponent,
    CardUnFilmComponent,
    CardUneSerieComponent
  ],
  exports: [
    ListeFilmsComponent,
    CardUnFilmComponent,
    CardUneSerieComponent
  ]
})
export class ComponentsModule { }
