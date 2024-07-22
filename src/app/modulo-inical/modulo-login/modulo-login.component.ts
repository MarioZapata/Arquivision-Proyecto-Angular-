import { Component } from '@angular/core';
import { UsuarioService } from '../usuarioService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modulo-login',
  templateUrl: './modulo-login.component.html',
  styleUrls: ['./modulo-login.component.css']
})
export class ModuloLoginComponent  {
  
  contraseña: string = '';
  formularioLogin: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,


  ) { 
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  login() {
    if (this.formularioLogin.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Faltan campos obligatorios o hay errores en el formulario!',
        confirmButtonText: 'Cerrar'
      });
      this.formularioLogin.markAllAsTouched();  // Marca todos los campos como tocados para mostrar los errores
      return;
    }
    
    this.contraseña= this.formularioLogin.value.contrasena
    this.usuarioService.login(this.formularioLogin.value.correo, this.contraseña).subscribe(
      user => {
        Swal.fire({
          icon: 'success',
          text: '¡Entró de manera correcta!',
          confirmButtonText: 'Cerrar'
        });
        localStorage.setItem('empresaPertenece', user.usuario.empresaPertenece);
        let tempnombre = `${user.usuario.nombre} ${user.usuario.apellido_Paterno}`;
        localStorage.setItem('nombreUsuario', tempnombre);
        localStorage.setItem('IdUsuario', user.usuario.idUsuario);
        localStorage.setItem('tipoUsuario', user.usuario.idTipoUsuario);
      },
      error => {
        //console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.error,
          confirmButtonText: 'Cerrar'
        });
      }
    );
  
    
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched;
  }
}
