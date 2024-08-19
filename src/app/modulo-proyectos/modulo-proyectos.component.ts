import { Component } from '@angular/core';
import { ProyectoService } from './s-proyecto-servicio';
import Swal from 'sweetalert2';
import { CatEstadoActividadService } from '../Cat_Services/CatEstadoActividadService';
import { CatTipoConstruccionService } from '../Cat_Services/CatTipoConstruccionService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProyectoSharedService } from './proyectoSharedService';
import { Router } from '@angular/router';
import { CatEstadoProyecto } from '../Cat_Services/CatEstadoProyectoService';

@Component({
  selector: 'app-modulo-proyectos',
  templateUrl: './modulo-proyectos.component.html',
  styleUrl: './modulo-proyectos.component.css'
})
export class ModuloProyectosComponent {
  // Variable para controlar la expansión de la fila
  filaExpandida: boolean[] = [];
  proyectos: any[]= []
  estados: any[] = []
  construcciones: any[] =[]
  errorMessage=""
  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];
  paginatedProyectos: any[] = [];
  empresa = localStorage.getItem('empresaPertenece');
  filtros = {
    idTipoConstruccion: '',
    tipoConstruccion: '',
    nombre: '',
    idEstadoProyecto: '',
    encargado: '',
    estado: '',
    municipio: '',
    cp: '',
    fechaInicio: '',
    fechaFinal: ''
  };
  constructor(private _proyectoService: ProyectoService, 
    private _catEstado: CatEstadoProyecto, 
    private _catConstru: CatTipoConstruccionService, 
    private http: HttpClient, 
    private proyectoshared: ProyectoSharedService,
    private router: Router,){
    this.cargarEstadoInicio();
    this.cargarTiposConstruccion();
    this.cargarProyectosbyEmpresas();
    
    
  }
  panelProyecto(Proyecto: any) {
    // Redirigir a la ruta del panel de proyecto con el ID
    this.router.navigate(['/proyectos/panel']);
    this.proyectoshared.setProyecto(Proyecto);
  }
  crearNuevoProyecto() {
    this.proyectoshared.clearProyecto(); // Limpia los datos compartidos
    this.router.navigate(['/proyectos/nuevo']); // Redirige a la página de nuevo proyecto
  }
  eliminarProyecto(id: number){
    console.log(id)
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este proyecto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va el código para eliminar el proyecto
        console.log("Proyecto eliminado");
        this._proyectoService.eliminarProyecto(id).subscribe(
          data => {
            console.log(data)
            if(data==true){
              Swal.fire(
                'Eliminado!',
                'El proyecto ha sido eliminado.',
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
  onSubmit() {
    if(this.empresa==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: "Error en el logue, favor de desloguearse, y volver a entrar",
        confirmButtonText: 'Cerrar'
      });
    }
    else{
      let agregarI=''
      let agregarF= ''
      console.log(this.filtros.fechaInicio)
      console.log(this.filtros.fechaInicio)
      console.log(this.filtros.fechaInicio)
      if(this.filtros.fechaInicio!=''){
        agregarI=" 00:00:00-06"
      }
      if(this.filtros.fechaFinal!=''){
        agregarF=" 00:00:00-06"
      }
      const params = new HttpParams()
      .set('empresa', this.empresa)
      .set('nombre', this.filtros.nombre)
      .set("idTipoConstruccion", this.filtros.idTipoConstruccion)
      .set('idEstadoProyecto', this.filtros.idEstadoProyecto)
      .set('encargado', this.filtros.encargado)
      .set('estado', this.filtros.estado)
      .set('municipio', this.filtros.municipio)
      .set('cp', this.filtros.cp)
      .set('fechaInicio', this.filtros.fechaInicio+agregarI)
      .set('fechaFinal', this.filtros.fechaFinal+agregarF);
      console.log(params)

      
      this._proyectoService.getProyectosByFilters(params).subscribe(        
        data => {
        this.proyectos=data
        this.calculatePages();
        this.updatePaginatedProyectos()
        console.log(data)
      },
      error => {
  
      });
    }

  }

  limpiarFiltros() {
    this.filtros = {
      idTipoConstruccion: '',
      tipoConstruccion: '',
      nombre: '',
      idEstadoProyecto: '',
      encargado: '',
      estado: '',
      municipio: '',
      cp: '',
      fechaInicio: '',
      fechaFinal: ''
    };
  
    
    
  }
  // Método para alternar el estado de expansión de la fila

  alternarExpansion(numero: number) {
    console.log(this.filaExpandida[numero])
    this.filaExpandida[numero] = !this.filaExpandida[numero];
  }
  obtenerNombrePorId(idTipoConstruccion: number, tipo: number): string | undefined {
    let tipoConstruccion;
    
    if (tipo === 1) {
        // Buscar en construcciones si tipo es 1
        tipoConstruccion = this.construcciones.find(tc => tc.idTipoConstruccion === idTipoConstruccion);
    } else {
        // Buscar en estados si tipo no es 1
        tipoConstruccion = this.estados.find(tc => tc.idEstadoProyecto === idTipoConstruccion);
    }
  
    // Retornar el nombre si se encuentra un tipoConstruccion, de lo contrario, undefined
    return tipoConstruccion ? tipoConstruccion.nombre : undefined;
  }
  editarProyecto(proyecto: any) {
    proyecto.fechaInicio= proyecto.fechaInicio.substring(0, 10);
    proyecto.fechaFin = proyecto.fechaFin.substring(0, 10);
    this.proyectoshared.setProyecto(proyecto);
    this.router.navigate(['/proyectos/editar', proyecto.idProyecto]);
  }

  cargarTiposConstruccion() {
    this._catConstru.obtenerTiposConstruccion()
      .subscribe(
        data => {
          this.construcciones = data;
          
          console.log(this.construcciones)
        },
        error => {
          this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';
        }
      );
  }

  cargarEstadoInicio(){
    this._catEstado.obtenerProyoctos().subscribe(        
      data => {
      this.estados = data;
      console.log(this.estados)
    },
    error => {
      this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';

    });
  }
  cargarProyectosbyEmpresas() {
   
    if(this.empresa==null){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: "Error con el usuario, favor de desloguearse",
        confirmButtonText: 'Cerrar'
      });
    }else{
      this._proyectoService.obtenerProyectoByEmpresa(this.empresa)
      .subscribe(
        data => {
          this.proyectos = data;
          this.proyectos.sort((a, b) => a.idProyecto - b.idProyecto);

          this.filaExpandida = new Array(this.proyectos.length).fill(false); // Inicializar el array
          this.calculatePages();
          this.updatePaginatedProyectos()
          console.log(this.proyectos)
        },
        error => {
          this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';

        }
      );
    }

  }
    calculatePages() {
    const totalItems = this.proyectos.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProyectos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProyectos = this.proyectos.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePaginatedProyectos();
    }
  }
}
