import { Component } from '@angular/core';
import { ProyectoService } from './s-proyecto-servicio';
import Swal from 'sweetalert2';
import { CatEstadoActividadService } from '../Cat_Services/CatEstadoActividadService';
import { CatTipoConstruccionService } from '../Cat_Services/CatTipoConstruccionService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProyectoSharedService } from './proyectoSharedService';
import { Router } from '@angular/router';

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
  empresa = localStorage.getItem('empresaPertenece');
 
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
    if(tipo==1){
       tipoConstruccion = this.construcciones.find(tc => tc.idTipoConstruccion === idTipoConstruccion);
    }else{
      
       tipoConstruccion = this.estados.find(tc => tc.idEstadoActividad === idTipoConstruccion);
      
    }
  
    return tipoConstruccion ? tipoConstruccion.nombre : undefined;
  }
  editarProyecto(proyecto: any) {
    proyecto.fechaInicio= proyecto.fechaInicio.substring(0, 10);
    proyecto.fechaFin = proyecto.fechaFin.substring(0, 10);
    this.proyectoshared.setProyecto(proyecto);


    this.router.navigate(['/proyectos/editar', proyecto.idProyecto]);
  }
  constructor(private _proyectoService: ProyectoService, 
    private _catEstado: CatEstadoActividadService, 
    private _catConstru: CatTipoConstruccionService, 
    private http: HttpClient, 
    private proyectoshared: ProyectoSharedService,
    private router: Router,){
    this.cargarEstadoInicio();
    this.cargarTiposConstruccion();
    this.cargarProyectosbyEmpresas();
    
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
    this._catEstado.obtenerTiposConstruccion().subscribe(        
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
          this.filaExpandida = new Array(this.proyectos.length).fill(false); // Inicializar el array

          console.log(this.proyectos)
        },
        error => {
          this.errorMessage = 'El servicio está fallando. Inténtalo de nuevo más tarde.';

        }
      );
    }

  }
  
}
