import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  recherche: string = '';
  genre: number[]=[];

  myForm: FormGroup;

  categories = [
    {
      nom: 'Aventure',
      idFilm: 12,
      idSerie: 10759,
      img: 'assets/genres/aventure.jpg'
    },
    {
      nom: 'Super Héro',
      idFilm: 878,
      idSerie: 10765,
      img: 'assets/genres/superhero.jpg'
    },
    {
      nom: 'Romance',
      idFilm: 10749,
      idSerie: 10766,
      img: 'assets/genres/romance.jpg'
    },
    {
      nom: 'Thriller',
      idFilm: 53,
      idSerie: 80,
      img: 'assets/genres/thriller.jpg'
    },
    {
      nom: 'Horreur',
      idFilm: 27,
      idSerie: 96,
      img: 'assets/genres/horreur.jpg'
    },
    {
      nom: 'Dessin animé',
      idFilm: 16,
      idSerie: 16,
      img: 'assets/genres/animation.jpg'
    }
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.fb.group({ text: [''] });
  }

  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.genre = [];
    this.cdr.detectChanges();
  }

  protected afficherGenre(g:any) {
    this.genre[0] =  g.idFilm;
    this.genre[1] =  g.idSerie;
    this.cdr.detectChanges();
  }

  protected resetRecherche() {
    this.recherche = '';
    this.genre = [];
    this.myForm.reset();
    this.cdr.detectChanges();
  }
}
