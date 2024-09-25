import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ControlParametersModel } from '../models/control.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;

  // Behavior subjects to emit values received from the hub
  private outputSubject = new BehaviorSubject<number>(0);
  public output$ = this.outputSubject.asObservable();

  private controlParamsSubject = new BehaviorSubject<ControlParametersModel | null>(null);
  public controlParams$ = this.controlParamsSubject.asObservable();

  // Start the connection to the ControlHub
  public startConnection(): void {
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
      })
      .catch((err) => console.log('Error starting SignalR connection: ' + err));
  }

  // Register listeners for events from the hub
  private registerListeners(): void {
    this.hubConnection?.onreconnecting((error) => {
        console.warn('Reconnecting...', error);
      })
      
      this.hubConnection?.onreconnected((connectionId) => {
        console.log('Reconnected. Connected with connectionId:', connectionId);
      })

      this.hubConnection?.onclose((error) => {
        console.error('Connection closed. Trying to reconnect...', error);
      });

    this.hubConnection?.on('Output', (output) => {
      console.log(output)
      this.outputSubject.next(output);
    });

    this.hubConnection?.on('ControlParametersUpdated', (params: ControlParametersModel) => {
      this.controlParamsSubject.next(params);
    });

    this.hubConnection?.on('ControlParameters', (params: ControlParametersModel) => {
      this.controlParamsSubject.next(params);
    });
  }

  // Send process variable to the hub
  public GetControlParameters(): void {
    this.hubConnection
      ?.invoke('GetControlParameters')
      .catch((err) => console.error(err));
  }

  // Set control parameters on the hub
  public setControlParameters(controlParameters: ControlParametersModel): void {
    this.hubConnection
      ?.invoke('SetControlParameters', controlParameters.kp, controlParameters.ti, controlParameters.td, controlParameters.minOutput, controlParameters.maxOutput, controlParameters.autoMode, controlParameters.isDirect, controlParameters.setPoint, controlParameters.manualOutput, 1000)
      .catch((err) => console.error(err));
  }

  public StartSimulation(): void{
    this.hubConnection
      ?.invoke('StartSimulation')
      .catch((err) => console.error(err));
  }
}
