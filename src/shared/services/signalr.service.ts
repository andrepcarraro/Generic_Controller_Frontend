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
    this.hubConnection?.on('ReceiveOutput', (output: number) => {
      this.outputSubject.next(output);
    });

    this.hubConnection?.on('ControlParametersUpdated', (params: ControlParametersModel) => {
      this.controlParamsSubject.next(params);
    });
  }

  // Send process variable to the hub
  public sendProcessVariable(processVariable: number): void {
    this.hubConnection
      ?.invoke('SendProcessVariable', processVariable)
      .catch((err) => console.error(err));
  }

  // Set control parameters on the hub
  public setControlParameters(controlParameters: ControlParametersModel): void {
    this.hubConnection
      ?.invoke('SetControlParameters', controlParameters)
      .catch((err) => console.error(err));
  }
}
