import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7128/api/Usuarios';

  constructor(private http: HttpClient) { }
  public numero1: number = 1
  // Método para login
  public login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contraseña }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response.token); // Guardar token en el almacenamiento de sesión
        }
      })
      
    );
  }

  public register(proyecto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, proyecto)
      .pipe(
        catchError(this.handleError)
      );
  }


  confirmEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/confirm?token=${token}`);
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





  private setSession(token: string) {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    ///console.log("Me estoy logueandio...")
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    console.log(expirationDate)
    return expirationDate > new Date();
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token)
    } catch (Error) {
      return null;
    }
  }

}
