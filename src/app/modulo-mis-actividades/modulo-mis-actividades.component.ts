import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CatEstadoActividadService } from '../Cat_Services/CatEstadoActividadService';
import { CatPrioridadService } from '../Cat_Services/CatPrioridadService';
import { CatTipoActividadService } from '../Cat_Services/CatTipoActividadService';
import { NuevaActividadService } from '../modulo-actividades/actividad-individual/nueva-actividad-service';
import { ActividadShared } from '../modulo-actividades/actividadShared';

@Component({
  selector: 'app-modulo-mis-actividades',
  templateUrl: './modulo-mis-actividades.component.html',
  styleUrl: './modulo-mis-actividades.component.css'
})
export class ModuloMisActividadesComponent {
  filaExpandida: boolean = false;
  empresa = localStorage.getItem('empresaPertenece');
  Actividades: any[] = [];

  tiposActividad: any[] = []; // Asegúrate de definir estos arrays
  estadosActividad: any[] = [];
  prioridades: any[] = [];
  errorMessage: string | null = null;

  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];
  paginatedActividades: any[] = [];
  
  filtros = {
    tipoActividad: '',
    encargado: '',
    nombre: '',
    idActividad: '',
    estadoActividad: '',
    asignado: '',
    prioridad: '',
    esCompraMateriales: '',
    fechaInicio: '' ,
    fechaFin: ''
  };
  // Método para alternar el estado de expansión de la fila
  
  constructor(private _actividadService: NuevaActividadService, 
    private _catTipoActividades: CatTipoActividadService,
    private _catPrioridad: CatPrioridadService,
    private _catEstadoAct: CatEstadoActividadService,
    private router: Router,
    private _actividadShared: ActividadShared
  ){
    this.loadEstadoAct()
    this.loadPrioridad()
    this.loadTipoActividades()
    this.loadActividades()
  }
  loadActividades(): void {
    this._actividadService.getActividades(this.empresa!).subscribe(
      data => {
        console.log(this.empresa)
        //console.log(data)
        this.Actividades = data;
        this.Actividades.sort((a, b) => a.idActividad - b.idActividad);
  
        this.calculatePages();
        this.updatePaginatedProyectos()
      },
      error => this.errorMessage = 'Error cargando actividades'
    );
  }
  loadTipoActividades(){
    this._catTipoActividades.obtenerTiposConstruccion().subscribe(
      data => {
        console.log(data)

        this.tiposActividad = data
      },
      error => this.errorMessage = 'Error cargando actividades'
    );
  }
  loadPrioridad(){
    this._catPrioridad.obtenerTiposConstruccion().subscribe(
      data => {
        console.log(data)

        this.prioridades = data
      },
      error => this.errorMessage = 'Error cargando actividades'
    );
  }
  loadEstadoAct(){
    this._catEstadoAct.obtenerTiposConstruccion().subscribe(
      data => {
        console.log(data)
        this.estadosActividad = data
      },
      error => this.errorMessage = 'Error cargando actividades'
    );
  }
  voBoActividad(id: number){
    this._actividadService.darVobo(id).subscribe(
      data => {
        Swal.fire(
          'Correcto!',
          'Se ha dado VO.BO. de manera correcta',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            location.reload();  // Esto recarga la página
          }
        });
      },
      error => this.errorMessage = error.error


    );
  }
  firmarActividad(id:number){
    this._actividadService.darFirma(id).subscribe(
      data => {
        Swal.fire(
          'Correcto!',
          'Se ha dado Firma. de manera correcta',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            location.reload();  // Esto recarga la página
          }
        });
      },
      error => this.errorMessage = error.error
    );
  }
  cancelarActvidad(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podras dar VOBO o Firmar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar actividad',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va el código para eliminar el proyecto
        console.log("Actividad cancelada");
        this._actividadService.darCancelacion(id).subscribe(
          data => {
            console.log(data)
            if(data==true){
              Swal.fire(
                'Cancelada!',
                'La actividad ha sido cancelada.',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  location.reload();  // Esto recarga la página
                }
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "No se cancelo de manera correcta",
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
  limpiarFiltros(): void {
    this.filtros = {
      tipoActividad: '',
      encargado: '',
      nombre: '',
      idActividad: '',
      estadoActividad: '',
      asignado: '',
      prioridad: '',
      esCompraMateriales: '',
      fechaInicio: '',
      fechaFin: ''
    };
    this.loadActividades();
  }
  crearNuevaActividad(): void {
    this._actividadShared.clearAct();
    this.router.navigate(['/actividad-individual']);
  }
   obtenerNombrePorId(idTipoConstruccion: number, tipo: number): string | undefined {
    let tipoConstruccion;
    
    if (tipo === 1) {
        // Buscar en construcciones si tipo es 1
        //console.log(idTipoConstruccion)
       // console.log(this.tiposActividad)
        tipoConstruccion = this.tiposActividad.find(tc => tc.idTipoActividad === idTipoConstruccion);
      

    } else {
      if(tipo===2){
        tipoConstruccion = this.estadosActividad.find(tc => tc.idEstadoActividad === idTipoConstruccion);
      }else{
        tipoConstruccion = this.prioridades.find(tc => tc.idPrioridad === idTipoConstruccion);
      }

        
    }
  
    // Retornar el nombre si se encuentra un tipoConstruccion, de lo contrario, undefined
    return tipoConstruccion ? tipoConstruccion.nombre : undefined;
  }

  onSubmit(): void {
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
    let params = new HttpParams()
    .set('IdTipoActividad', this.filtros.tipoActividad)
    .set('Encargado', this.filtros.encargado)
    .set('Nombre', this.filtros.nombre)
    .set('IdActividad', this.filtros.idActividad)
    .set('IdEstadoActividad', this.filtros.estadoActividad)
    .set('Asignado', this.filtros.asignado)
    .set('IdPrioridad', this.filtros.prioridad)
    .set('EsCompraDeMateriales', this.filtros.esCompraMateriales)
    .set('FechaInicio', this.filtros.fechaInicio+agregarI)
    .set('FechaFin', this.filtros.fechaFin+agregarF)
    .set('EmpresaEncargada', this.empresa!);
    console.log(params)

    this._actividadService.getActividadesByFiltros(params).subscribe(
      data => {
        this.Actividades = data;
        console.log(data)
        this.Actividades.sort((a, b) => a.idActividad - b.idActividad);
  
        this.calculatePages();
        this.updatePaginatedProyectos()
      },
      error => this.errorMessage = 'Error buscando actividades'
    );
  }
  calculatePages() {
    const totalItems = this.Actividades.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProyectos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedActividades = this.Actividades.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePaginatedProyectos();
    }
  }
}
