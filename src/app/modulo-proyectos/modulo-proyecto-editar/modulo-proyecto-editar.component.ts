import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevaActividad } from '../../modulo-actividades/actividad-individual/nueva-actividad';
import { NuevaActividadService } from '../../modulo-actividades/actividad-individual/nueva-actividad-service';
import { CatEstadoActividadService } from '../../Cat_Services/CatEstadoActividadService';
import { CatTipoActividadService } from '../../Cat_Services/CatTipoActividadService';
import { ProyectoSharedService } from '../proyectoSharedService';
import { CatEstadoProyecto } from '../../Cat_Services/CatEstadoProyectoService';
import Swal from 'sweetalert2';
import { ProyectoService } from '../s-proyecto-servicio';
import { HttpParams } from '@angular/common/http';
import { ActividadShared } from '../../modulo-actividades/actividadShared';

@Component({
  selector: 'app-modulo-proyecto-editar',
  templateUrl: './modulo-proyecto-editar.component.html',
  styleUrl: './modulo-proyecto-editar.component.css'
})
export class ModuloProyectoEditarComponent implements OnInit  {
  
 
  empresa = localStorage.getItem('empresaPertenece');
  actividades: any[] = [];
  paginatedActividades: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Número de elementos por página
  pages: number[] = [];
  catEstadoActividad: any[]=[]
  catEstadoProyecto: any[]=[]
  catTipoActividad: any[]=[]
  Proyecto: any = null;
  filtros = {
    estadoSeleccionado: '',
    nombre: '',
    idProyecto: '',
    fechaInicio: '',
    fechaFin: ''
  }

  constructor(private route: ActivatedRoute, 
    private _actividadService: NuevaActividadService,
    private _catEstadoActividad: CatEstadoActividadService,
    private _catTipoActividad: CatTipoActividadService,
    private proyectShared: ProyectoSharedService,
    private _catEstadoProyecto: CatEstadoProyecto,
    private _proyectoService: ProyectoService,
    private router: Router,
    private _actividadShared: ActividadShared
   ) { }

  ngOnInit(): void {
    this.obtenerCatEstadoActividad()
    this.obtenerCatTipoActividad();
    this.obtenerCatEstadoProyecto();
    this.Proyecto = this.proyectShared.getProyecto()
    if(this.Proyecto==null){
     
      this.router.navigate(['/proyectos']);
    }else{
      this._actividadService.getActividadByEmpresa(this.empresa!, this.Proyecto.idProyecto) .subscribe(
        data => {
          this.actividades = data;
          console.log(this.actividades)
          this.paginate();
        },
        error => {
          //this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';
          console.log(error)
        }
      );
  
    }



  }
  buscarPedidos(){
    let agregarI=''
    let agregarF= ''
    console.log(this.filtros.fechaInicio)
    console.log(this.filtros.fechaInicio)
    console.log(this.filtros.fechaInicio)
    if(this.filtros.fechaInicio!=''){
      agregarI=" 00:00:00-06"
    }
    if(this.filtros.fechaFin!=''){
      agregarF=" 00:00:00-06"
    }
    const params = new HttpParams()
    .set('IdActividad', this.filtros.idProyecto)//es id Actividad
    .set('IdTipoActividad', '')
    .set('IdEstadoActividad', '')
    .set('IdPrioridad', '')
    .set('Nombre', this.filtros.nombre)
    .set('Encargado', '')
    .set('Asignado', '')
    .set('FechaInicio', this.filtros.fechaInicio+agregarI)
    .set('FechaFin', this.filtros.fechaFin+agregarF)
    .set("EsCompraDeMateriales", '')
    .set('idEstadoProyecto', '')
    .set('EmpresaEncargada', this.empresa!)

    this._actividadService.getActividadesByFiltros(params).subscribe(
      data => {
        this.actividades = data;
        console.log(data)
        this.actividades.sort((a, b) => a.idActividad - b.idActividad);
        this.paginate();
     
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: "No se encontro, actividades",
          confirmButtonText: 'Cerrar'
        });
      }
        
    );
    
  }
  limpiar(){
    //this.filtros.estadoSeleccionado='',
    this.filtros.fechaFin='',
    this.filtros.fechaInicio='',
    this.filtros.idProyecto='',
    this.filtros.nombre=''
  }
  obtenerCatTipoActividad(){
    this._catTipoActividad.obtenerTiposConstruccion() .subscribe(
      data => {
       this.catTipoActividad= data;
       console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }
  obtenerCatEstadoActividad(){
    this._catEstadoActividad.obtenerTiposConstruccion() .subscribe(
      data => {
       this.catEstadoActividad= data;
       console.log(data)

      },
      error => {
        console.log(error)
      }
    );
  }
  obtenerCatEstadoProyecto(){
    this._catEstadoProyecto.obtenerProyoctos() .subscribe(
      data => {
       this.catEstadoProyecto= data;
       console.log(data)

      },
      error => {
        console.log(error)
      }
    );
  }
  getEstadoNombre(id: number): string {
    const estado = this.catEstadoActividad.find(e => e.idEstadoActividad === id);
    return estado ? estado.nombre : 'Desconocido';
  }
  buscarProyecto(){
    console.log(this.filtros)
  }

  getTipoNombre(id: number): string {
    const tipo = this.catTipoActividad.find(t => t.idTipoActividad === id);
    return tipo ? tipo.nombre : 'Desconocido';
  }
  paginate(): void {
    const totalItems = this.actividades.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.updatePage();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedActividades = this.actividades.slice(start, end);
  }

  changePage(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePage();
    }
  }
  
  verActividad(actividad: any): void {
    this.router.navigate(['/actividad-individual']);
    this._actividadShared.setActividad(actividad, 1);
    }

  modificarActividad(actividad: any): void {
    this.router.navigate(['/actividad-individual']);
    this._actividadShared.setActividad(actividad, 2);
  }

  eliminarActividad(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar esta Actividad!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va el código para eliminar el proyecto
        console.log("Actividad eliminado");
        this._actividadService.delete(id).subscribe(
          data => {
            console.log(data)
            if(data==true){
              Swal.fire(
                'Eliminado!',
                'El Actividad ha sido eliminado.',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {

                  this.ngOnInit();
                }
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "No se elimino de manera correcta",
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
    });
  }
  cambiarEstado(id : number){
    let idCambio = this.filtros.estadoSeleccionado
    console.log(idCambio)
    Swal.fire({
      title: '¿Estás seguro de cambiar el estatus?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let objetoCambio = {
          "id": id,
          "idCambio": idCambio 
        }
        // Aquí va el código para eliminar el proyecto
        console.log("Proyecto eliminado");
        this._proyectoService.cambiarStatus(objetoCambio).subscribe(
          data => {
            console.log(data)
            if(data==true){
              Swal.fire(
                'Cambiado!',
                'El proyecto ha sido cambiado.',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  this.proyectShared.clearProyecto(); // Limpia los datos compartidos
                  this.router.navigate(['/proyectos']);                 }
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "No se cambio de manera correcta",
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
    });

    
  }
}
