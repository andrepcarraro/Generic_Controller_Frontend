import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../shared/services/signalr.service';
import { ControlParametersModel } from '../shared/models/control.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}
  isLoading = false;
  graphicVisible = false;
  title = 'Generic_Controller_Frontend';
  controllerParameters: ControlParametersModel = {
    kp: 5, // Proporcional
    ti: 0.6, // Integral
    td: 0.4, // Derivativo

    minOutput: 1, // Representa 0%
    maxOutput: 1000, // Representa 100%

    // Ação direta ou reversa
    isDirect: true,

    // SetPoint
    setPoint: 600,

    cycleTime: 500,
  };

  ngOnInit(): void {
    this.isLoading = true;
    // Start the SignalR connection
    this.signalRService.startConnection(this.controllerParameters);

    setTimeout(() => {
      this.graphicVisible = true;
      this.isLoading = false;
    }, 500);
  }

  controllerParametersChange() {
    this.isLoading = true;
    this.graphicVisible = false;
    this.signalRService.StopSimulation();
    this.signalRService.setControlParameters(this.controllerParameters);
    setTimeout(() => {
      this.graphicVisible = true;
      this.isLoading = false;
    }, 1000);
  }
}
