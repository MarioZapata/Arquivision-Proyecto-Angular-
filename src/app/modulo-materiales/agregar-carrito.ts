import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgregarCarritoService {
  private baseUrl = 'https://localhost:7128/api/carrito'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  agregarAlCarrito(carritoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/agregar`, carritoData).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.'); // Devuelve un observable de error
  }
}

