import { Component } from '@angular/core';

@Component({
  selector: 'app-modulo-mis-actividades',
  templateUrl: './modulo-mis-actividades.component.html',
  styleUrl: './modulo-mis-actividades.component.css'
})
export class ModuloMisActividadesComponent {
  // Variable para controlar la expansión de la fila
  filaExpandida: boolean = false;

  // Método para alternar el estado de expansión de la fila
  alternarExpansion() {
    this.filaExpandida = !this.filaExpandida;
  }
}
