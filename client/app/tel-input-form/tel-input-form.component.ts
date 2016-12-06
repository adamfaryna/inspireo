import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tel-input-form',
  templateUrl: './tel-input-form.component.html',
  styleUrls: ['./tel-input-form.component.css'],
  host: { class: 'content-block' }
})
export class TelInputFormComponent implements OnInit {

  constructor() { }

  model: {tel: string} = {
    tel: ''
  };

  submit() {

  }

  ngOnInit() {
  }

}
