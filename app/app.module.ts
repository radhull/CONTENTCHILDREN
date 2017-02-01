import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, AppTab, AppPanel }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent , AppTab, AppPanel],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
