import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiderService {
  private apiUrl = 'https://localhost:7128/api/Usuarios/'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }
  private token = localStorage.getItem('token');
  
  getUsersByCompany(empresa: string) {
    let apiUrl=this.apiUrl+"getUsuarioByEmpresa"
    // Construye los parámetros de consulta
    console.log(empresa)
    const params = new HttpParams().set('Empresa', empresa);


    // Configura los encabezados de la solicitud, incluyendo el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    // Realiza la solicitud HTTP GET con los parámetros de consulta y encabezados
    return this.http.get<any>(apiUrl, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  eliminarUsuario(userID: number) {
    const apiUrl = this.apiUrl + 'EliminarUsuario';
    const params = new HttpParams().set('userID', userID.toString());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.patch<any>(apiUrl, null, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

 
  
  darPermiso(userID: number, Permiso: number) {

    let apiUrl=this.apiUrl+"DarPermiso"
    let params = new HttpParams()
    .set('userID', userID.toString())
    .set('permiso', Permiso.toString());
    // Configura los encabezados de la solicitud, incluyendo el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.patch<any>(apiUrl, null, { headers, params }).pipe(
      catchError(this.handleError)
    );
    
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor devolvió un código de error
      errorMessage = `Error código ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
