import { Component } from '@angular/core';
import { LiderService } from './lider-service';
import { CatTipoUsuariosService } from '../Cat_Services/CatTipoUsuarioService';
import Swal from 'sweetalert2';

declare const bootstrap: any;

@Component({
  selector: 'app-modulo-usuarios',
  templateUrl: './modulo-usuarios.component.html',
  styleUrls: ['./modulo-usuarios.component.css']
})
export class ModuloUsuariosComponent {
  usuarios2: any[] = [];
  roles: any[] = [];
  textoMensaje: string = "";
  selectedUserId: number | null = null;
  selectedRoleId: number | null = null;
  accion: 'permiso' | 'eliminar' | null = null;
  constructor(private _liderService: LiderService, private _usuario: CatTipoUsuariosService) {
    this.cargarRoles();
    let empresa = localStorage.getItem('empresaPertenece');
    
    if (empresa == null) {
      console.log("Error");
    } else {
      this.cargarUsuarios(empresa);
    }
  }

  cargarRoles() {
    this._usuario.obtenerUsuarios().subscribe(
      data => {
        this.roles = data;
        console.log(this.roles); // Verifica que roles tenga datos aquí
      },
      error => {
        console.error(error);
      }
    );
  }

  cargarUsuarios(Empresa: string) {
    this._liderService.getUsersByCompany(Empresa).subscribe(
      data => {
        this.usuarios2 = data;
        console.log(this.usuarios2);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.error,
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  openModal(userID: number, idTipoUsuario: number, nombre: string) {
    console.log(idTipoUsuario)
    this.selectedUserId = userID;

    if (idTipoUsuario != -1) {
      this.selectedRoleId = idTipoUsuario;
      this.textoMensaje = "¿Estás seguro que deseas darle permiso al usuario " + nombre + "?";
      this.accion = 'permiso';
    } else {
      this.textoMensaje = "¿Estás seguro que deseas eliminar el usuario " + nombre + "?";
      this.accion = 'eliminar';
    }

    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("No se encontró el elemento del modal.");
    }
  }
  


  confirmarAccion() {
    if (this.accion === 'permiso' && this.selectedUserId && this.selectedRoleId) {
      this._liderService.darPermiso(this.selectedUserId, this.selectedRoleId).subscribe(
        data => {
         
          location.reload(); // Recarga la página después de confirmar la acción
        },
        error => {
         
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );
    } else if (this.accion === 'eliminar' && this.selectedUserId) {
      this.eliminarUsuario(this.selectedUserId);
      location.reload()
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    modal.hide();
  }

  eliminarUsuario(userID: number) {
    this._liderService.eliminarUsuario(userID).subscribe(
      data => {
        
        location.reload(); // Recarga la página después de eliminar el usuario
      },
      error => {
        console.error(error);
      }
    );
  }
}
