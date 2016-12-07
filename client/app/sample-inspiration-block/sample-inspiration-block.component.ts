import { Component, OnInit, Inject } from '@angular/core';
import { Inspiration, InspirationService } from '../service/inspiration/inspiration.service';

@Component({
  selector: 'app-sample-inspiration-block',
  templateUrl: './sample-inspiration-block.component.html',
  styleUrls: ['./sample-inspiration-block.component.css'],
  host: { class: 'content-block' }
})
export class SampleInspirationBlockComponent implements OnInit {

  constructor(@Inject(InspirationService) private inspirationService: InspirationService) {}

  inspiration: Inspiration;
  errorMessage: any;

  ngOnInit(): void {
    this.inspirationService.getInspiration()
      .subscribe(
        inspiration => this.inspiration = inspiration,
        error => this.errorMessage = <any>error
      );
  }
}
