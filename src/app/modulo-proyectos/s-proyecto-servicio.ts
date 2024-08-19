import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = 'https://localhost:7128/api/Proyectos'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }
  private token = localStorage.getItem('token');
  public getProyectosByFilters(params: any){

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let apiUrl=this.apiUrl+"/getProyectosByFiltros"
    return this.http.get<any>(apiUrl, { headers , params}).pipe(
        catchError(this.handleError)
      );
  }
  public actulizarProyecto(proyecto: any){
    console.log(proyecto)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let apiUrl=this.apiUrl+"/actulizarProyecto"
    return this.http.patch<any>(apiUrl, proyecto, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  // Método para enviar el nuevo proyecto al backend
  public enviarNuevoProyecto(proyecto: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let apiUrl=this.apiUrl+"/crearProyecto"
    return this.http.post<any>(apiUrl, proyecto, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  public obtenerProyectoByEmpresa(empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const params = new HttpParams().set('Empresa', empresa);
    const apiUrl = `${this.apiUrl}/getProyectosByEmpresa`;
    return this.http.get<any>(apiUrl, { headers, params }).pipe(
        catchError(this.handleError)
    );
  }
  public getProyectoByIdorName(empresa: string, id: string, nombre: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log(id)
    console.log(nombre)
    const params = new HttpParams().set('Empresa', empresa)
    .set('Id', id)
    .set('Nombre',nombre);
    const apiUrl = `${this.apiUrl}/getProyectoByIdName`;
    return this.http.get<any>(apiUrl, { headers, params }).pipe(
        catchError(this.handleError)
    );
  }
  public eliminarProyecto(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let apiUrl = this.apiUrl + "/deleteProyecto";
    const body = { id: id }; // Enviar ID en el cuerpo
    console.log(id);
    return this.http.patch<any>(apiUrl, id, { headers }).pipe(
        catchError(this.handleError)
    );
  }
  public cambiarStatus(objetoCambio:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let apiUrl = this.apiUrl + "/changeStatus";
    return this.http.patch<any>(apiUrl, objetoCambio, { headers }).pipe(
        catchError(this.handleError)
    );

  }
  // Manejo de errores
  private handleError(error: any): Observable<any> {
    //console.error('Error en la solicitud:');
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: error.error,
      confirmButtonText: 'Cerrar'
    });
    return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.'); // Devuelve un observable de error
  }
  

}
