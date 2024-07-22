
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuarioService';


@Component({
  selector: 'app-modulo-registro',
  templateUrl: './modulo-registro.component.html',
  styleUrl: './modulo-registro.component.css'
})
export class ModuloRegistroComponent {
  registroForm: FormGroup
  esPropietario: boolean = false
  Contrasena= ''
 

  constructor(private userService: UsuarioService, private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      Direccion: ['', Validators.required],
      Edad: ['', [Validators.required, Validators.min(18)]],
      EmpresaPertenece: ['', Validators.required],
      Contrasena: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmarContrasena: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator
    });
  }


  onSubmit() {
    console.log(this.esPropietario)
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Faltan campos obligatorios o hay errores en el formulario!',
        confirmButtonText: 'Cerrar'
      });
      this.registroForm.markAllAsTouched();
      return;
    }


    const user = {
      correo: this.registroForm.value.Correo,
      nombre: this.registroForm.value.Nombre,
      apellidoPaterno: this.registroForm.value.ApellidoPaterno,
      apellidoMaterno: this.registroForm.value.ApellidoMaterno,
      direccion: this.registroForm.value.Direccion,
      edad: this.registroForm.value.Edad,
      empresaPertenece: this.registroForm.value.EmpresaPertenece,
      contraseña: this.registroForm.value.Contrasena,
      idTipoUsuario: 4
    }
    if(this.esPropietario==true){
      user.idTipoUsuario=1
    }
    console.log(user)
    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor, espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.userService.register(user).subscribe(response => {
      Swal.close();
      console.log('User registered successfully', response);
      Swal.fire({
        icon: 'success',
        text: '¡Usuario registrado correctamente!, favor de revisar correo',
        confirmButtonText: 'Cerrar'
      });
    }, error => {
     
      
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('Contrasena')?.value === form.get('ConfirmarContrasena')?.value 
      ? null : { mismatch: true };
  }

  hasErrors(controlName: string, errorType: string) {
    return this.registroForm.get(controlName)?.hasError(errorType) && this.registroForm.get(controlName)?.touched;
  }

  

  
}
