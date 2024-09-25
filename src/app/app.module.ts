import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGModule } from '../shared/modules/primeNG.module';
import { ControlDashboardComponent } from './components/control-dashboard/control-dashboard.component';
import { OutputGraphComponent } from './components/output-graph/output-graph.component';

@NgModule({
  declarations: [AppComponent, ControlDashboardComponent, OutputGraphComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
