import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { BallsComponent } from './components/balls/balls.component';
import { RequestComponent } from './components/request-component/request-component.component'

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'map', component: MapComponent},
  {path: 'balls', component: RequestComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
