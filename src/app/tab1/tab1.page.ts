import {ChangeDetectorRef, Component} from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  recherche: string = '';
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.fb.group({ text: [''] });
  }

  onRecherche() {
    this.recherche = this.myForm.value.text;
    this.cdr.detectChanges();
  }
}
