import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSnackBarModule
} from "@angular/material";
import { MapComponent } from "./components/map/map.component";
import { MatCardModule } from "@angular/material";
import { BallsComponent } from "./components/balls/balls.component";
import { BaseCurrencyComponent } from "./components/base-currency/base-currency.component";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { D3Service, D3_DIRECTIVES } from './d3';
import { AppComponent } from './app.component';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RequestComponent } from './components/request-component/request-component.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    BallsComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    BaseCurrencyComponent,
    AppComponent,
    DashboardComponent,
    MapComponent,
    RequestComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AgGridModule.withComponents([])
  ],
  providers: [D3Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
