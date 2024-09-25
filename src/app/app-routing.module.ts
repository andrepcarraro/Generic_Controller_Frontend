import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlDashboardComponent } from './components/control-dashboard/control-dashboard.component';
import { OutputGraphComponent } from './components/output-graph/output-graph.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: 'full'
  },
  { path: "dashboard", component: ControlDashboardComponent },
  { path: "outputGraph", component: OutputGraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
