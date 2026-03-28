import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { WatchedService } from '../service/watched.service';
import { AddedService} from "../service/added.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  recherche: string = '';
  myForm: FormGroup;

  switchPage: boolean = true; //true = séries, false = films
  test = [
    { titre: 'pipi', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { titre: 'caca', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { titre: 'prout', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
  ];

  filmsVus: any[] = [];
  filmsAjoute: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private watchedService: WatchedService,
    private addedService: AddedService
  ) {
    this.myForm = this.fb.group({ text: [''] });
  }

  //Chargement des données à chaque fois qu'onarrive sur la page
  ionViewWillEnter() {
    this.filmsVus = this.watchedService.getWatched();
    this.filmsAjoute = this.addedService.getAdded();
  }

  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.cdr.detectChanges();
  }
}
