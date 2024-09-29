import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ControlParametersModel, OutputModel } from '../models/control.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;

  // Behavior subjects to emit values received from the hub
  private outputSubject = new BehaviorSubject<OutputModel | null>(null);
  public output$ = this.outputSubject.asObservable();

  // Start the connection to the ControlHub
  public startConnection(controlParameters: ControlParametersModel): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5010/controlHub')
      .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connected to ControlHub.');
        this.registerListeners();
        this.setControlParameters(controlParameters)
      })
      .catch((err) => console.log('Error starting SignalR connection: ' + err));
  }

  // Register listeners for events from the hub
  private registerListeners(): void {
    this.hubConnection?.onreconnecting((error) => {
      console.warn('Reconnecting...', error);
    });

    this.hubConnection?.onreconnected((connectionId) => {
      console.log('Reconnected. Connected with connectionId:', connectionId);
    });

    this.hubConnection?.onclose((error) => {
      console.error('Connection closed. Trying to reconnect...', error);
    });

    this.hubConnection?.on('Output', (output) => {
      console.log(output);
      this.outputSubject.next(output);
    });

    this.hubConnection?.on('ProcessVariableUpdated', (output) => {
      console.log(output);
    });

    this.hubConnection?.on('StopSimulation', (output) => {
      console.log(output);
    });

    this.hubConnection?.on('StartSimulation', (output) => {
      console.log(output);
    });

    this.hubConnection?.on('ControlParametersUpdated', (output) => {
      console.log(output);
    });

    this.hubConnection?.on('modeChanged', (output) => {
      console.log(output);
    });

    this.hubConnection?.on('manualOutputUpdated', (output) => {
      console.log(output);
    });
  }

  // Set control parameters on the hub
  public setControlParameters(controlParameters: ControlParametersModel): void {
    this.hubConnection
      ?.invoke(
        'SetControlParameters',
        controlParameters.kp,
        controlParameters.ti,
        controlParameters.td,
        controlParameters.minOutput,
        controlParameters.maxOutput,
        controlParameters.isDirect,
        controlParameters.setPoint,
        controlParameters.cycleTime
      )
      .catch((err) => console.error(err));
  }

  public StartSimulation(): void {
    this.hubConnection
      ?.invoke('StartSimulation')
      .catch((err) => console.error(err));
  }

  public StopSimulation(): void {
    this.hubConnection
      ?.invoke('StopSimulation')
      .catch((err) => console.error(err));
  }

  public SetProcessVariable(processVariable: number): void {
    this.hubConnection
      ?.invoke('SetProcessVariable', processVariable)
      .catch((err) => console.error(err));
  }

  public ChangeMode(isAutoModel: boolean): void {
    this.hubConnection
      ?.invoke('ChangeMode', isAutoModel)
      .catch((err) => console.error(err));
  }

  public SetManualOutput(manualOutput: number): void {
    this.hubConnection
      ?.invoke('SetManualOutput', manualOutput)
      .catch((err) => console.error(err));
  }
}
