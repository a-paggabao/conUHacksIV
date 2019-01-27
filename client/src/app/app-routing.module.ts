import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { BallsComponent } from './components/balls/balls.component';
import { RequestComponent } from './components/request-component/request-component.component';

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'balls', component: BallsComponent},
  {path: 'linechart/:base/:compared', component: RequestComponent},
  {path: '', redirectTo: 'map', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
