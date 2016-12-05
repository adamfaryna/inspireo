import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MarketingMessageBlockComponent } from './marketing-message-block/marketing-message-block.component';
import { TelInputFormComponent } from './tel-input-form/tel-input-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketingMessageBlockComponent,
    TelInputFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
