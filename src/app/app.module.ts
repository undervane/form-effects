import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormEffectsModule } from 'form-effects';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormEffectsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
