import { Component } from '@angular/core';

@Component({
  selector: 'app-modulo-materiales',
  templateUrl: './modulo-materiales.component.html',
  styleUrl: './modulo-materiales.component.css'
})
export class ModuloMaterialesComponent {
  filaExpandida: boolean = false;

  alternarExpansion() {
    this.filaExpandida = !this.filaExpandida;
  }


}
