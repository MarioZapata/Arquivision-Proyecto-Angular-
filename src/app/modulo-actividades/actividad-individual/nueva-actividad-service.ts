import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NuevaActividad } from './nueva-actividad';

@Injectable({
  providedIn: 'root'
})
export class NuevaActividadService {

  private apiUrl = 'https://localhost:7128/api/Actividades'; // Reemplaza con la URL correcta de tu API
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  // Método para enviar el nuevo proyecto al backend
  public subirActividad(proyecto: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(this.apiUrl, proyecto,{ headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  public update(actividad: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    let apiUrl = this.apiUrl + "/updateActividad";
    console.log(apiUrl)
    return this.http.post<any>(apiUrl, actividad, { headers })
        .pipe(
            catchError(this.handleError)
        );
  }
  public delete(id: number):  Observable<any>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    let apiUrl = this.apiUrl + "/deleteActividad";
    console.log(apiUrl)
    return this.http.patch<any>(apiUrl, id, { headers })
        .pipe(
            catchError(this.handleError)
        );
  }
  public darVobo(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    let apiUrl = this.apiUrl + "/giveVoBo";
    console.log(apiUrl)
    return this.http.patch<any>(apiUrl, id, { headers })
        .pipe(
            //catchError(this.handleError)
        );
  }
  public darFirma(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    let apiUrl = this.apiUrl + "/giveFirma";
    console.log(apiUrl)
    return this.http.patch<any>(apiUrl, id, { headers })
        .pipe(
            //catchError(this.handleError)
        );
  }
  public darCancelacion(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    let apiUrl = this.apiUrl + "/giveCancelacion";
    console.log(apiUrl)
    return this.http.patch<any>(apiUrl, id, { headers })
        .pipe(
            //catchError(this.handleError)
        );
  }

  public getActividadByEmpresa(empresa: string, id: number){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let params = new HttpParams().set('Empresa', empresa)
    .set('idProyecto', id);
    return this.http.get<any>(this.apiUrl+"/getActividadByEmpresa" , { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }
  public getActividades(empresa: string){
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);
    let params = new HttpParams().set('Empresa', empresa)
    return this.http.get<any>(this.apiUrl+"/getActividades" , { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }
  public getActividadesByFiltros(params: HttpParams){
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);
    let apiUrl = this.apiUrl + "/getActividadesByFilters";
    return this.http.get<any>(apiUrl, { headers, params }).pipe(
        catchError(this.handleError)
    );
  }
  // Manejo de errores
  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.'); // Devuelve un observable de error
  }
 

}
