import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NuevaActividad } from './nueva-actividad';

@Injectable({
  providedIn: 'root'
})
export class NuevaActividadService {

  private apiUrl = 'https://localhost:7128/api/Actividades'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  // Método para enviar el nuevo proyecto al backend
  public subirActividad(proyecto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proyecto)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.'); // Devuelve un observable de error
  }

}
