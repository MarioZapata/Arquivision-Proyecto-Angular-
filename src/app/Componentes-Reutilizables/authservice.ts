import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7128/api/Usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  // Método para login
  login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contraseña }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response.token); // Guardar token en el almacenamiento de sesión
        }
      })
    );
  }

  private setSession(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    // Elimina las credenciales del usuario (ejemplo: token de sesión)
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio de sesión
    
    window.location.reload()

  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    //console.log("Me estoy logueandio...")
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    //console.log(expirationDate)
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