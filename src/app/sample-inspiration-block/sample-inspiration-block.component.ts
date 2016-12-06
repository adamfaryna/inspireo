import { Component, OnInit } from '@angular/core';
import { Inspiration } from '../inspiration';

@Component({
  selector: 'app-sample-inspiration-block',
  templateUrl: './sample-inspiration-block.component.html',
  styleUrls: ['./sample-inspiration-block.component.css'],
  host: { class: 'content-block' }
})
export class SampleInspirationBlockComponent implements OnInit {

  constructor() { }

  inspiration = new Inspiration('ala ma kota', 'focus');

  ngOnInit() {
  }

}
