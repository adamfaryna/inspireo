import { Component } from '@angular/core';

@Component({
  selector: 'app-tel-input-form',
  templateUrl: './tel-input-form.component.html',
  styleUrls: ['./tel-input-form.component.css'],
  host: { class: 'content-block' }
})
export class TelInputFormComponent {

  constructor() { }

  submitted: boolean = false;

  model: {tel: string} = {
    tel: ''
  };

  submit() {
    this.submitted = true;
  }
}
