import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.fb.group({ text: [''] });
  }
  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.cdr.detectChanges();
  }
}
