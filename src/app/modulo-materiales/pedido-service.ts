import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private baseUrl = 'https://localhost:7128/api/Pedido'; // Reemplaza con la URL de tu API
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  obtenerTiposConstruccion(Empresa: string): Observable<any[]> {
 
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);
      // Crear HttpParams para agregar parámetros de consulta
      let params = new HttpParams().set('Empresa', Empresa);

      let apiUrl = `${this.baseUrl}/obtenerPedido`;
  
      return this.http.get<any[]>(apiUrl, { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }
  getPedidobyIdorName(name: string, id: number|null): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let params;
    console.log(id)
    if(id==null){
       params = new HttpParams().set('nombre', name)
    }
    else{
       params = new HttpParams().set('nombre', name)
      .set('idPedido', id);
    }
    console.log(params)

  
    return this.http.get<any>(`${this.baseUrl}/getPedidoNameORId`, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }
  validarDelete(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let params;
    params = new HttpParams().set('id', id)
  
    return this.http.get<any>(`${this.baseUrl}/validar`, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }
  deletePedido(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.patch<any>(`${this.baseUrl}/deletePedido`, id ,{ headers }).pipe(
      catchError(this.handleError)
    );
  }

  agregarPedido(pedidoData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.baseUrl}/crearPedido`, pedidoData, { headers }).pipe(
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

