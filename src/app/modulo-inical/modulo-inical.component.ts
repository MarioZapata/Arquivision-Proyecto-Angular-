import { Component } from '@angular/core';
import { AuthService } from '../Componentes-Reutilizables/authservice';

@Component({
  selector: 'app-modulo-inical',
  templateUrl: './modulo-inical.component.html',
  styleUrl: './modulo-inical.component.css'
})
export class ModuloInicalComponent {
  activeTab: string = 'Carousel';
  collapsed = false;
  screenWidth = 0;

  openTab(tabName: string): void {
    this.activeTab = tabName;
  }
  onToggleSideNav(data: { collapsed: boolean, screenWidth: number }) {
    this.collapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
    //authService
    constructor(public authService: AuthService) { 

    }
  
    logout() {
      this.authService.logout();
    }
}
