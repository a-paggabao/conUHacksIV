import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { MapComponent } from "./components/map/map.component";
import { MatCardModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

import { D3Service, D3_DIRECTIVES } from "./d3";

import { GraphComponent } from "./visuals/graph/graph.component";
import { SHARED_VISUALS } from "./visuals/shared";
import { BallsComponent } from "./components/balls/balls.component";
import { BaseCurrencyComponent } from "./components/base-currency/base-currency.component";

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
    MapComponent
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
    MatCardModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule {}
