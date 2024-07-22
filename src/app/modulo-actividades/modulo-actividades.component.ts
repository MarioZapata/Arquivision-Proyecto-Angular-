import { Component } from '@angular/core';

@Component({
  selector: 'app-modulo-actividades',
  templateUrl: './modulo-actividades.component.html',
  styleUrl: './modulo-actividades.component.css'
})
export class ModuloActividadesComponent {
  // Variable para controlar la expansión de la fila
  filaExpandida: boolean = false;

  // Método para alternar el estado de expansión de la fila
  alternarExpansion() {
    this.filaExpandida = !this.filaExpandida;
  }
}
