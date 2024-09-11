import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Generic_Controller_Frontend';
  sidebarVisible = false;


  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

}
