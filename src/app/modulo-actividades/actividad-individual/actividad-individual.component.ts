import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatPrioridadService } from '../../Cat_Services/CatPrioridadService';
import { OnInit } from '@angular/core';
import { CatTipoActividadService } from '../../Cat_Services/CatTipoActividadService';
import { NuevaActividadService } from './nueva-actividad-service';
import { ProyectoService } from '../../modulo-proyectos/s-proyecto-servicio';
import Swal from 'sweetalert2';

declare const bootstrap: any;
@Component({
  selector: 'app-actividad-individual',
  templateUrl: './actividad-individual.component.html',
  styleUrl: './actividad-individual.component.css'
})
export class ActividadIndividualComponent implements OnInit {
  isCompraMateriales: boolean = false;
  filaExpandida: boolean[] = [];
  formularioActividadNueva: FormGroup;
  errorMessage: string ="";
  arrayPrioridades: any[] = []
  arrayTipoAct: any[] = []
  usuario: null | string = ""
  idAct: number=1;
  seEncontro: boolean= false;
  proyectoElegir: any[] =[]
  empresa = localStorage.getItem('empresaPertenece');
  selectedProyectoId: number | null = null;

  constructor(private formBuilder: FormBuilder, 
    private prioridadService: CatPrioridadService, 
    private tiposAct: CatTipoActividadService, 
    private actividadService: NuevaActividadService,
    private proyectoService: ProyectoService
  ){
   
    this.formularioActividadNueva = this.formBuilder.group({
      tipoActividad: ['', Validators.required],
      nombreActividad: ['', Validators.required],
      encargado: ['', Validators.required],
      asignado: ['', Validators.required],
      prioridad: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      IdProyecto:['', Validators.required],
      nombreProyecto:[]
    });
  }
  seleccionarProyecto(id: number): void {
    this.selectedProyectoId = id;
  }
  cancelar(){
    this.seEncontro=false
  }
  confirmarAccion() {
   
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    modal.hide();
  }
  alternarExpansion(numero: number) {
    console.log(this.filaExpandida[numero])
    this.filaExpandida[numero] = !this.filaExpandida[numero];
  }
  openModal(){
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("No se encontró el elemento del modal.");
    }
  }
  buscarProyecto(){
   console.log(this.formularioActividadNueva.value.IdProyecto);
   console.log(this.formularioActividadNueva.value.nombreProyecto);
   if(this.empresa==null){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Favor de desloguerase, y volver a entrar',
      confirmButtonText: 'Cerrar'
    });
   }else{
    if(this.formularioActividadNueva.value.IdProyecto=='' && this.formularioActividadNueva.value.nombreProyecto==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'No se eligio ningun paramatero para la busqueda de proyecto',
        confirmButtonText: 'Cerrar'
      });
    }else{
     if(this.formularioActividadNueva.value.nombreProyecto==null){
       this.proyectoService.getProyectoByIdorName(this.empresa, this.formularioActividadNueva.value.IdProyecto,"").subscribe(
        data => {          
          console.log(data[0].nombre)
          this.formularioActividadNueva.patchValue({
            nombreProyecto: data[0].nombre
          });
            Swal.fire({
            icon: 'success',
            text: '¡Se encontro el proyecto de manera correcta!',
            confirmButtonText: 'Cerrar'
          });
          this.seEncontro=true;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );
     }else{
      this.proyectoService.getProyectoByIdorName(this.empresa, "", this.formularioActividadNueva.value.nombreProyecto).subscribe(
        data => {
          
          if(data.lenght!=1){
           this.proyectoElegir=data
           this.openModal();
          }
     
      

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );
     }
    }
   }
 
   //console.log(nombre)
  }
  ngOnInit(){
    this.cargarActividades();
    this.cargarTiposPrioridades();
    this.usuario = sessionStorage.getItem('nombreUsuario')
    
  }


  toggleCompraMateriales() {
    this.isCompraMateriales = !this.isCompraMateriales;
    if (this.isCompraMateriales) {
      this.formularioActividadNueva.get('idCompra')?.setValidators(Validators.required);
      this.formularioActividadNueva.get('compania')?.setValidators(Validators.required);
      this.formularioActividadNueva.get('producto')?.setValidators(Validators.required);
      this.formularioActividadNueva.get('total')?.setValidators(Validators.required);
      this.formularioActividadNueva.get('fechaEntrega')?.setValidators(Validators.required);
    } else {
      this.formularioActividadNueva.get('idCompra')?.clearValidators();
      this.formularioActividadNueva.get('compania')?.clearValidators();
      this.formularioActividadNueva.get('producto')?.clearValidators();
      this.formularioActividadNueva.get('total')?.clearValidators();
      this.formularioActividadNueva.get('fechaEntrega')?.clearValidators();
    }
    this.formularioActividadNueva.get('idCompra')?.updateValueAndValidity();
    this.formularioActividadNueva.get('compania')?.updateValueAndValidity();
    this.formularioActividadNueva.get('producto')?.updateValueAndValidity();
    this.formularioActividadNueva.get('total')?.updateValueAndValidity();
    this.formularioActividadNueva.get('fechaEntrega')?.updateValueAndValidity();
  }
  
  onSubmit() {
 
    const nuevaActividad = {
      eliminado: false,
      idEstadoProyecto: 1,
      idTipoActividad: this.formularioActividadNueva.value.tipoActividad ,//En esta parte quiero poner el numero, no el nombre, es decir si elegi el 1 compra material, quiero enviar 1 no compra materiales
      idEstadoActividad:  1,
      nombre: this.formularioActividadNueva.value.nombreActividad,
      encargado: this.formularioActividadNueva.value.encargado,
      asignado: this.formularioActividadNueva.value.asignado,
      idPrioridad: this.formularioActividadNueva.value.prioridad,
      fechaInicio: this.formularioActividadNueva.value.fechaInicio,
      fechaFin:  this.formularioActividadNueva.value.fechaFin,
      esCompraDeMateriales: this.isCompraMateriales,
      idPedido:  null,
      compañia: null,
      fechaDeEntrega: null,
      idProyecto: this.formularioActividadNueva.value.IdProyecto,
      idDocumento: null,
      usuarioCreo:   this.usuario

    }
    console.log(nuevaActividad)
    if (this.formularioActividadNueva.valid) {
      this.actividadService.subirActividad(nuevaActividad)
        .subscribe(
          response => {
            console.log("Subida de datos exitosa", response);
          },
          error => {
            this.errorMessage = 'Error al subir los datos. Inténtalo de nuevo más tarde.';
            console.error(error);
          }
        );
    } else {
     console.log('Por favor, complete todos los campos requeridos.') 
    }

  }

  cargarActividades() {
    this.tiposAct.obtenerTiposConstruccion()
      .subscribe(
        data => {
          this.arrayTipoAct = data;
        },
        error => {
          this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';
          console.error(error);
        }
      );
  }
  cargarTiposPrioridades() {
    this.prioridadService.obtenerTiposConstruccion()
      .subscribe(
        data => {
          this.arrayPrioridades = data;
        },
        error => {
          this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';
          console.error(error);
        }
      );
  }


}
