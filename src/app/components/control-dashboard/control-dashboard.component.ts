import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlParametersModel } from '../../../shared/models/control.model';
import { SignalRService } from '../../../shared/services/signalr.service';

@Component({
  selector: 'app-control-dashboard',
  templateUrl: './control-dashboard.component.html',
  styleUrl: './control-dashboard.component.scss'
})
export class ControlDashboardComponent implements OnInit {
  constructor(private signalRService: SignalRService) { }

  // Auto/Manual Options
  autoManualOptions = [
    { label: 'Auto', value: true },
    { label: 'Manual', value: false }
  ];

  // Ação Reversa/Direta Options
  acaoOptions = [
    { label: 'Ação Reversa', value: false },
    { label: 'Ação Direta', value: true }
  ];

  setpointValue = 0;
  controllerParameters!: ControlParametersModel;

  processVariable = 0;
  output = 0;

  ngOnInit(): void {
    this.createControllerModel(null)
    this.signalRService.controlParams$.subscribe(controllerParams => {
     // this.createControllerModel(controllerParams);
    })
  }

  private createControllerModel(controllerParams: ControlParametersModel | null) {
    if (controllerParams != null) {
      this.controllerParameters = controllerParams;
      return;
    }

    this.controllerParameters = {
      kp: 0.1,   // Proporcional
      ti: 0.1,   // Integral
      td: 0.1,   // Derivativo

      minOutput: 1,   // Representa 0%
      maxOutput: 5,   // Representa 100%

      // Modo automático ou manual
      autoMode: true,

      // Ação direta ou reversa
      isDirect: true,

      // SetPoint
      setPoint: 4,
      // Saída atual no modo manual
      manualOutput: 1,
    };
  }

  // Send process variable to the SignalR Hub
  setControlParameters(): void {
    this.signalRService.setControlParameters(this.controllerParameters);
  }

  public triggerVibration() {
    if (navigator.vibrate)
      navigator.vibrate(200); // Vibrates for 200 milliseconds
  }
}
