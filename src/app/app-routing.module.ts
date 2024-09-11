import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlDashboardComponent } from './components/control-dashboard/control-dashboard.component';

const routes: Routes = [
  { path: "dashboard", component: ControlDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
