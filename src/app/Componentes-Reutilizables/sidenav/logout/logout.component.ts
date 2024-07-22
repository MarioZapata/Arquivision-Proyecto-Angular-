import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authservice';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Seguro que quieres desloguearte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desloguearme',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });



  }
}