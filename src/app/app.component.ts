import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { SignalRService } from '../shared/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private signalRService: SignalRService) { }
  
  title = 'Generic_Controller_Frontend';
  sidebarVisible = false;


  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  ngOnInit(): void {
    // Start the SignalR connection
    this.signalRService.startConnection();
  }
  
  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

}
