import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://localhost:7128/api/Producto/obtener/'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }
  private token = localStorage.getItem('token');

  obtenerTiposConstruccion(IdUsuario: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.apiUrl=this.apiUrl+IdUsuario
    return this.http.get<any[]>(this.apiUrl,{headers})
      .pipe(
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
