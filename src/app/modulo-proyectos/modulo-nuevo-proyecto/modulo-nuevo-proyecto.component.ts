import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatTipoConstruccionService } from '../../Cat_Services/CatTipoConstruccionService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../s-proyecto-servicio';
import Swal from 'sweetalert2';
import { ContentObserver } from '@angular/cdk/observers';
import { ProyectoSharedService } from '../proyectoSharedService';

@Component({
  selector: 'app-modulo-nuevo-proyecto',
  templateUrl: './modulo-nuevo-proyecto.component.html',
  styleUrls: ['./modulo-nuevo-proyecto.component.css']
})
export class ModuloNuevoProyectoComponent implements OnInit {
  tiposConstruccion: any[] = [];
  errorMessage = '';
  nombreEmpresa: string | null = '';
  formularioProyecto: FormGroup;
  nombreUser: string | null = '';
  Proyecto: any = null;
  

  constructor(
    private service: CatTipoConstruccionService,
    private proyectoService: ProyectoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoShared: ProyectoSharedService
  ) {
    this.formularioProyecto = this.formBuilder.group({
      tipoConstruccion: ['', Validators.required],
      encargado: ['', Validators.required],
      nombreProyecto: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarTiposConstruccion();
    this.nombreEmpresa = localStorage.getItem('empresaPertenece');
    this.nombreUser = localStorage.getItem('nombreUsuario');
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      const navigation = this.router.getCurrentNavigation();
      this.Proyecto = this.proyectoShared.getProyecto();
      if (this.Proyecto) {
        this.cargarProyecto(this.Proyecto);
        console.log(this.Proyecto)
      } else {
        //this.cargarProyectoDesdeServicio(proyectoId);
      }
    });
  }

  cargarTiposConstruccion() {
    this.service.obtenerTiposConstruccion().subscribe(
      data => { this.tiposConstruccion = data; },
      error => {
        this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    );
  }

  cargarProyecto(proyecto: any) {
    this.formularioProyecto.patchValue({
      tipoConstruccion: proyecto.id_TipoConstruccion,
      encargado: proyecto.encargado,
      nombreProyecto: proyecto.nombre,
      estado: proyecto.estado,
      municipio: proyecto.municipio,
      codigoPostal: proyecto.cp,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin,
    });
  }


  onSubmit() {
    if (this.formularioProyecto.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: this.errorMessage,
        confirmButtonText: 'Cerrar'
      });
      this.formularioProyecto.markAllAsTouched();
      return;
    }
  
    const proyecto = {
      // Incluye el id solo si es una actualización
      ...(this.Proyecto ? { idProyecto: this.Proyecto.idProyecto } : {}),
      eliminado: false,
      id_TipoConstruccion: this.formularioProyecto.value.tipoConstruccion,
      encargado: this.formularioProyecto.value.encargado,
      nombre: this.formularioProyecto.value.nombreProyecto,
      idEstadoProyecto: 1, // Puedes ajustar esto según tu lógica
      estado: this.formularioProyecto.value.estado,
      municipio: this.formularioProyecto.value.municipio,
      cp: this.formularioProyecto.value.codigoPostal,
      fechaInicio: this.formularioProyecto.value.fechaInicio+'T06:00:00Z',
      fechaFin: this.formularioProyecto.value.fechaFin+'T06:00:00Z',
      empresaEncargada: this.nombreEmpresa,
      
      // Propiedad específica para creación
      ...(this.Proyecto ? { usuarioModifico: this.nombreUser, 
        usuarioCreo: this.Proyecto.usuarioCreo, 
        usuarioElimino: null,
        //fechaCreacion
      
      } : { usuarioCreo: this.nombreUser, })
     
    };

    if (this.Proyecto) {
      console.log(proyecto);
      proyecto
      this.proyectoService.actulizarProyecto(proyecto).subscribe(
        
        response => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            text: 'Proyecto actualizado exitosamente!',
            confirmButtonText: 'Cerrar'
          }).then(() => {
            this.router.navigate(['/proyectos']);
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            text: 'Erro en el envio de proyecto',
            confirmButtonText: 'Cerrar'
          });
        }
      );
    } else {
      this.proyectoService.enviarNuevoProyecto(proyecto).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            text: 'Proyecto enviado exitosamente!',
            confirmButtonText: 'Cerrar'
          }).then(() => {
            this.router.navigate(['/proyectos']);
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioProyecto.get(controlName)?.hasError(errorType) && this.formularioProyecto.get(controlName)?.touched;
  }
}
