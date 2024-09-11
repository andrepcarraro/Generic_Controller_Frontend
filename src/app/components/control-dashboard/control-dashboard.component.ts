import { Component } from '@angular/core';

@Component({
  selector: 'app-control-dashboard',
  templateUrl: './control-dashboard.component.html',
  styleUrl: './control-dashboard.component.scss'
})
export class ControlDashboardComponent {
  setpointValue = 0;

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
}
