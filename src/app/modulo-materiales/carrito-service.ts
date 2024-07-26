import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private baseUrl = 'https://localhost:7128/api/carrito'; // Reemplaza con la URL de tu API
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}
  
  agregarAlCarrito(carritoData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.baseUrl}/agregar`, carritoData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerCarrito(IdUsuario: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let baseUrl=this.baseUrl+"/obtener/"+IdUsuario
    return this.http.get<any[]>(baseUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  updateCarrito(idCarrito: number, cantidad: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const body = { idCarrito, cantidad };
    console.log(body)
    return this.http.patch(`${this.baseUrl}/updateCarrito`, body, {headers}).pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<any> {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: error.error,
      confirmButtonText: 'Cerrar'
    });
    return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.'); // Devuelve un observable de error
  }

}

