import { Component, OnInit } from '@angular/core';
import { ControlParametersModel } from '../../../shared/models/control.model';
import { SignalRService } from '../../../shared/services/signalr.service';

@Component({
  selector: 'app-control-dashboard',
  templateUrl: './control-dashboard.component.html',
  styleUrl: './control-dashboard.component.scss'
})
export class ControlDashboardComponent implements OnInit {
  setpointValue = 0;
  controllerParameters!: ControlParametersModel;

  processVariable = 0;
  output = 0;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    debugger
    // Start the SignalR connection
    this.signalRService.startConnection();

    // Subscribe to the output from the PID controller
    this.signalRService.output$.subscribe((output) => {
      this.output = output;
    });
  }

  // Send process variable to the SignalR Hub
  sendProcessVariable(): void {
    this.signalRService.sendProcessVariable(this.processVariable);
  }

  // Auto/Manual Options
  autoManualOptions = [
    { label: 'Auto', value: 'auto' },
    { label: 'Manual', value: 'manual' }
  ];
  mode = 'manual';

  // Ação Reversa/Direta Options
  acaoOptions = [
    { label: 'Ação Reversa', value: 'reversa' },
    { label: 'Ação Direta', value: 'direta' }
  ];
  acao = 'direta';

  public triggerVibration() {
    if (navigator.vibrate) {
      navigator.vibrate(200); // Vibrates for 200 milliseconds
    } else {
      console.warn('Vibration API not supported');
    }
  }

  public createCotrollerModel(){
    this.controllerParameters = {
      Kp: 0.1,   // Proporcional
      Ti: 0.1,   // Integral
      Td: 0.1,   // Derivativo
  
      MinOutput: 1,   // Representa 0%
      MaxOutput: 5,   // Representa 100%
  
      // Modo automático ou manual
      AutoMode: true,
  
      // Ação direta ou reversa
      IsDirect: true,
  
      // SetPoint
      SetPoint: 1, 
      // Saída atual no modo manual
      ManualOutput: 1, 
    };
  }
}
