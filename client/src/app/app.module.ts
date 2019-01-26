import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatDatepickerModule, MatFormFieldModule, MatButtonModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, MapComponent],
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
