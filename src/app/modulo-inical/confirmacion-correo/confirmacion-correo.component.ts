import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuarioService';

@Component({
  selector: 'app-confirmacion-correo',
  templateUrl: './confirmacion-correo.component.html',
  styleUrl: './confirmacion-correo.component.css'
})
export class ConfirmacionCorreoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private router: Router
   ) {
    
   }
  YEsta: boolean = false
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if(this.YEsta==false){

      }else{

      }
      if (token) {
        this.userService.confirmEmail(token).subscribe(response => {
          Swal.fire({
            icon: 'success',
            text: '¡Correo confirmado correctamente!',
            confirmButtonText: 'Cerrar'
          })
         
        }, error => {
          
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Error al confirmar el correo',
            confirmButtonText: 'Cerrar'
          })
          console.error('Error al confirmar el correo', error);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Token de confirmación no encontrado',
          confirmButtonText: 'Cerrar'
        })
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Ajusta la ruta según sea necesario
  }



}
