import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketing-message-block',
  templateUrl: './marketing-message-block.component.html',
  styleUrls: ['./marketing-message-block.component.css'],
  host: { class: 'content-block' }
})
export class MarketingMessageBlockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
