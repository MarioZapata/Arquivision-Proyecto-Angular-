import { Component, Input } from '@angular/core';
import { AuthService } from './Componentes-Reutilizables/authservice';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'ArquiVision';
  
  //collapsed = false;
  screenWidth = 0;
  collapsed: boolean = false;
  isConfirm: boolean = false;


  onToggleSideNav(data: { collapsed: boolean, screenWidth: number }) {
    this.collapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
   
  
    logout() {
      this.authService.logout();
    }

    constructor(
      public authService: AuthService,
      public router: Router,
      public activatedRoute: ActivatedRoute
    ) {
      // Suscribirse a cambios en la URL para ajustar el estado de colapso
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Verificar la URL actual
          if (this.router.url.includes('/confirm')) {
            console.log('Estoy en confirm');
            this.isConfirm = true;
          } else {
            this.isConfirm = false;
          }
     
        }
      });
    }
}
