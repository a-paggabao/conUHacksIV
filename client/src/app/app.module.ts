import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { D3Service, D3_DIRECTIVES } from './d3';

import { AppComponent } from './app.component';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { BallsComponent } from './components/balls/balls.component';
import { BaseCurrencyComponent } from './components/base-currency/base-currency.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    BallsComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    BaseCurrencyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
