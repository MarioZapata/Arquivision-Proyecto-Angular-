import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatPrioridadService } from '../../Cat_Services/CatPrioridadService';
import { OnInit } from '@angular/core';
import { CatTipoActividadService } from '../../Cat_Services/CatTipoActividadService';
import { NuevaActividadService } from './nueva-actividad-service';
import { ProyectoService } from '../../modulo-proyectos/s-proyecto-servicio';
import Swal from 'sweetalert2';
import { PedidoService } from '../../modulo-materiales/pedido-service';
import { ActividadShared } from '../actividadShared';
import { Router } from '@angular/router';

declare const bootstrap: any;
@Component({
  selector: 'app-actividad-individual',
  templateUrl: './actividad-individual.component.html',
  styleUrl: './actividad-individual.component.css'
})
export class ActividadIndividualComponent implements OnInit {
  isCompraMateriales: boolean = false;
  isCompraMateriales2: boolean = false;
  filaExpandida: boolean[] = [];
  formularioActividadNueva: FormGroup;
  errorMessage: string ="";
  arrayPrioridades: any[] = []
  arrayTipoAct: any[] = []
  Pedidos: any[] = []
  nombreUsuario = localStorage.getItem("nombreUsuario")
  idAct: number=1;
  seEncontro: boolean= false;
  proyectoElegir: any[] =[]
  empresa = localStorage.getItem('empresaPertenece');
  selectedProyectoId: number | null = null;
  selectedPedidoId: number | null = null;
  botonCompa: boolean = false
  seEncontroCompra=false
  sharedActividad: any;
  tipo: number|null;
  textoTipo: string;
  soloVista: boolean=false;
  constructor(private formBuilder: FormBuilder, 
    private prioridadService: CatPrioridadService, 
    private tiposAct: CatTipoActividadService, 
    private actividadService: NuevaActividadService,
    private proyectoService: ProyectoService,
    private pedidoService: PedidoService,
    private actividadShared: ActividadShared,
    private router: Router,
    
  ){
    this.seEncontroCompra=false
    this.formularioActividadNueva = this.formBuilder.group({
      tipoActividad: ['', Validators.required],
      nombreActividad: ['', Validators.required],
      encargado: ['', Validators.required],
      asignado: ['', Validators.required],
      prioridad: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      IdProyecto:['', Validators.required],
      nombreProyecto:[],
      nombreCompra:[],
      idCompra:[],
      compraMateriales:[]
    });
    this.sharedActividad=actividadShared.getActividad();
    this.tipo=actividadShared.getTipo();
    console.log(this.sharedActividad)
    console.log(this.tipo)
    if(this.tipo===null){
      this.tipo=0;
    }
    console.log(this.tipo)
    this.textoTipo="Actividad #"
    switch(this.tipo){
      case 0:
        this.textoTipo="Actividad #"
        break
      case 1:
        this.textoTipo="Ver Actividad: "+this.sharedActividad.idActividad
        this.soloVista=true
        this.cargarDatosAct()
        break 
      case 2:
        this.textoTipo="Editar Actividad: "+this.sharedActividad.idActividad
        this.cargarDatosAct()
        this.soloVista=false
        break 
     
    }
    

  }
  cargarDatosAct(){
    let fechaInicio = this.sharedActividad.fechaInicio 
    ? new Date(this.sharedActividad.fechaInicio).toISOString().split('T')[0] 
    : null;
    let fechaFin = this.sharedActividad.fechaInicio 
    ? new Date(this.sharedActividad.fechaInicio).toISOString().split('T')[0] 
    : null;
  
    console.log(fechaInicio);
    this.formularioActividadNueva.patchValue({
      tipoActividad: this.sharedActividad.idTipoActividad,
      nombreActividad: this.sharedActividad.nombre,
      encargado: this.sharedActividad.encargado,
      asignado: this.sharedActividad.asignado,
      prioridad: this.sharedActividad.idPrioridad,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
      
    });

    this.proyectoService.getProyectoByIdorName(this.empresa!, this.sharedActividad.idProyecto, "").subscribe(
      data => {
        //console.log(data[0]);
        this.formularioActividadNueva.patchValue({
          
          IdProyecto: data[0].idProyecto,
          nombreProyecto: data[0].nombre,
          
        });
       
        this.seEncontro = true
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'No se encontro proyecto',
          confirmButtonText: 'Cerrar'
        });
      }
    );
    if(this.sharedActividad.idPedido!=null){
      console.log("entre")
      this.pedidoService.getPedidobyIdorName("", this.sharedActividad.idPedido).subscribe(
        data => {
          console.log(data);
          this.formularioActividadNueva.patchValue({
            idCompra: this.sharedActividad.idPedido,
            nombreCompra: data[0].nombreDelPedido,
            compraMateriales: true
          });
          this.toggleCompraMateriales();
          this.seEncontroCompra = true;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'No existe el pedido, favor de comunicarse con el equipo de soporte',
            confirmButtonText: 'Cerrar'
          });
        }
      );
    }else{
      this.isCompraMateriales=false
    }
   
  
  }
  seleccionarProyecto(id: number): void {
    this.selectedProyectoId = id;
  }
  seleccionarPedido(id: number): void {
    this.selectedPedidoId = id;
  }
  cancelar(){
    this.seEncontro=false
  }
  confirmarAccion() {
    if(this.selectedProyectoId==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'No se eligio ningun proyecto',
        confirmButtonText: 'Cerrar'
      });
    }else{
      this.formularioActividadNueva.patchValue({
        IdProyecto: this.selectedProyectoId
      });
     this.seEncontro=true
      const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
      modal.hide();
    }
  }
  confirmarAccion2() {
    if(this.selectedPedidoId==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'No se eligio ningun proyecto',
        confirmButtonText: 'Cerrar'
      });
    }else{
      this.formularioActividadNueva.patchValue({
        idCompra: this.selectedPedidoId
      });
     this.seEncontroCompra=true
      const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal2'));
      modal.hide();
    }
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
  openModal2(){
    const modalElement = document.getElementById('confirmationModal2');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("No se encontró el elemento del modal.");
    }
  }
  buscarCompra(){
    if(this.empresa==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Favor de desloguerase, y volver a entrar',
        confirmButtonText: 'Cerrar'
      });
    }else{
      const id = this.formularioActividadNueva.value.idCompra;
      const nombre = this.formularioActividadNueva.value.nombreCompra;
      
      if ((id===null || id==='') && (nombre === null || nombre === '')){
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'No se eligió ningún parámetro para la búsqueda de proyecto',
          confirmButtonText: 'Cerrar'
        });
      } else {
        if (nombre === null || nombre === '') {
          // Aquí manejas el caso en el que nombreProyecto es nulo o vacío
          this.pedidoService.getPedidobyIdorName("", id).subscribe(
            data => {
              console.log(data);
              this.formularioActividadNueva.patchValue({
                nombreCompra: data[0].nombreDelPedido
              });
              Swal.fire({
                icon: 'success',
                text: '¡Se encontró el proyecto de manera correcta!',
                confirmButtonText: 'Cerrar'
              });
              this.seEncontroCompra = true;
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error,
                confirmButtonText: 'Cerrar'
              });
            }
          );
        } else {
          // Aquí manejas el caso en el que nombreProyecto no es nulo ni vacío
          this.pedidoService.getPedidobyIdorName(nombre,null).subscribe(
            data => {
              if (data.length !== 1) {
                this.Pedidos = data;
                this.openModal2();
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Error...',
                  text: "No existe ningun proyecto con los parametros especificados",
                  confirmButtonText: 'Cerrar'
                });
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
      // Asegúrate de que el formulario esté bien inicializado
      const idProyecto = this.formularioActividadNueva.value.IdProyecto;
      const nombreProyecto = this.formularioActividadNueva.value.nombreProyecto;

  if (idProyecto === '' && (nombreProyecto === null || nombreProyecto === '')) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'No se eligió ningún parámetro para la búsqueda de proyecto',
      confirmButtonText: 'Cerrar'
    });
  } else {
    if (nombreProyecto === null || nombreProyecto === '') {
      // Aquí manejas el caso en el que nombreProyecto es nulo o vacío
      this.proyectoService.getProyectoByIdorName(this.empresa, idProyecto, "").subscribe(
        data => {
          console.log(data[0].nombre);
          this.formularioActividadNueva.patchValue({
            nombreProyecto: data[0].nombre
          });
          Swal.fire({
            icon: 'success',
            text: '¡Se encontró el proyecto de manera correcta!',
            confirmButtonText: 'Cerrar'
          });
          this.seEncontro = true;
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
    } else {
      // Aquí manejas el caso en el que nombreProyecto no es nulo ni vacío
      this.proyectoService.getProyectoByIdorName(this.empresa, "", nombreProyecto).subscribe(
        data => {
          if (data.length !== 1) {
            this.proyectoElegir = data;
            this.openModal();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: "No existe ningun proyecto con los parametros especificados",
              confirmButtonText: 'Cerrar'
            });
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
    
    
  }
  cancelar2(){
    this.seEncontroCompra = !this.seEncontroCompra
  }

  toggleCompraMateriales() {
    this.isCompraMateriales = !this.isCompraMateriales;
  }
  
  onSubmit() {
    console.log(this.tipo)
    if(this.isCompraMateriales==true && this.seEncontroCompra==false){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Favor, de buscar el Pedido',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
    if (this.formularioActividadNueva.invalid) {
      // Marca todos los controles como tocados para activar las validaciones
      this.formularioActividadNueva.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Favor, de llenar todos los campos obligatorios',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
    if(this.seEncontro==false){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Favor, de buscar un proyecto',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
    if(this.tipo==2){
      console.log("Entre")
      const actividadObjeto = {
          idActividad: this.sharedActividad.idActividad, 
          eliminado: false,
         // idEstadoProyecto: 1,
          idTipoActividad: this.formularioActividadNueva.value.tipoActividad ,//En esta parte quiero poner el numero, no el nombre, es decir si elegi el 1 compra material, quiero enviar 1 no compra materiales
          idEstadoActividad:  1,
          nombre: this.formularioActividadNueva.value.nombreActividad,
          encargado: this.formularioActividadNueva.value.encargado,
          asignado: this.formularioActividadNueva.value.asignado,
          idPrioridad: this.formularioActividadNueva.value.prioridad,
          fechaInicio: this.formularioActividadNueva.value.fechaInicio+'T06:00:00Z',
          fechaFin:  this.formularioActividadNueva.value.fechaFin+'T06:00:00Z',
          esCompraDeMateriales: this.isCompraMateriales,
          idPedido:  this.isCompraMateriales ? this.formularioActividadNueva.value.idCompra : null,
          empresaEncargada: this.empresa,
          idProyecto: this.formularioActividadNueva.value.IdProyecto,
          idDocumento: null,
          usuarioCreo:   this.nombreUsuario
        }
      
      console.log(actividadObjeto)
      this.actividadService.update(actividadObjeto)
        .subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              text: 'Actividad editada exitosamente!',
              confirmButtonText: 'Cerrar'
            }).then(() => {
              this.router.navigate(['/actividades']);
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: error,
              confirmButtonText: 'Cerrar'
            });
            
          }
        );
    }else{
      const nuevaActividad = {
        idActividad: 0,
        eliminado: false,
        idEstadoProyecto: 1,
        idTipoActividad: this.formularioActividadNueva.value.tipoActividad ,//En esta parte quiero poner el numero, no el nombre, es decir si elegi el 1 compra material, quiero enviar 1 no compra materiales
        idEstadoActividad:  1,
        nombre: this.formularioActividadNueva.value.nombreActividad,
        encargado: this.formularioActividadNueva.value.encargado,
        asignado: this.formularioActividadNueva.value.asignado,
        idPrioridad: this.formularioActividadNueva.value.prioridad,
        fechaInicio: this.formularioActividadNueva.value.fechaInicio+'T06:00:00Z',
        fechaFin:  this.formularioActividadNueva.value.fechaFin+'T06:00:00Z',
        esCompraDeMateriales: this.isCompraMateriales,
        idPedido:  this.isCompraMateriales ? this.formularioActividadNueva.value.idCompra : null,
        empresaEncargada: this.empresa,
        idProyecto: this.formularioActividadNueva.value.IdProyecto,
        idDocumento: null,
        usuarioCreo:   this.nombreUsuario
  
      }
      console.log(nuevaActividad)
     
      this.actividadService.subirActividad(nuevaActividad)
          .subscribe(
            response => {
              Swal.fire({
                icon: 'success',
                text: 'Actividad subida exitosamente!',
                confirmButtonText: 'Cerrar'
              }).then(() => {
                this.router.navigate(['/actividades']);
              });
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error,
                confirmButtonText: 'Cerrar'
              });
              
            }
          );
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
  hasErrors(controlName: string, errorType: string) {
    return this.formularioActividadNueva.get(controlName)?.hasError(errorType) && this.formularioActividadNueva.get(controlName)?.touched;
  }


}
