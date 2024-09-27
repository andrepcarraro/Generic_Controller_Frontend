import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlParametersModel } from '../../../shared/models/control.model';
import { SignalRService } from '../../../shared/services/signalr.service';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-control-dashboard',
  templateUrl: './control-dashboard.component.html',
  styleUrl: './control-dashboard.component.scss',
})
export class ControlDashboardComponent {
  constructor(private signalRService: SignalRService) {}

  sidebarVisible = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  // Auto/Manual Options
  autoManualOptions = [
    { label: 'Auto', value: true },
    { label: 'Manual', value: false },
  ];

  // Ação Reversa/Direta Options
  acaoOptions = [
    { label: 'Ação Reversa', value: false },
    { label: 'Ação Direta', value: true },
  ];

  // The two-way bound property
  @Input() controllerParameters!: ControlParametersModel;

  // Output event emitter for two-way binding
  @Output() controllerParametersChange =
    new EventEmitter<ControlParametersModel>();

  // Send process variable to the SignalR Hub
  setControlParameters(): void {
    this.signalRService.setControlParameters(this.controllerParameters);
  }

  public triggerVibration() {
    if (navigator.vibrate) navigator.vibrate(200); // Vibrates for 200 milliseconds
  }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
    this.onParameterChange();
  }

  // Method to trigger change and emit the updated value
  onParameterChange(): void {
    this.setControlParameters();
    this.controllerParametersChange.emit(this.controllerParameters);
  }
}
