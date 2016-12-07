import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MarketingMessageBlockComponent } from './marketing-message-block/marketing-message-block.component';
import { TelInputFormComponent } from './tel-input-form/tel-input-form.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SampleInspirationBlockComponent } from './sample-inspiration-block/sample-inspiration-block.component';
import { InspirationService } from './service/inspiration/inspiration.service';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MarketingMessageBlockComponent,
    TelInputFormComponent,
    SampleInspirationBlockComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ InspirationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
