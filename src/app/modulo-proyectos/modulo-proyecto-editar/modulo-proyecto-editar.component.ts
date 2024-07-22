import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modulo-proyecto-editar',
  templateUrl: './modulo-proyecto-editar.component.html',
  styleUrl: './modulo-proyecto-editar.component.css'
})
export class ModuloProyectoEditarComponent implements OnInit  {
  
  tipo: number | undefined;
  nombre_tipo: string = ''
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el valor del parámetro tipo
    this.route.params.subscribe(params => {
      this.tipo = +params['tipo']; // Convierte el parámetro tipo a número
      console.log('Tipo recibido:', this.tipo);
    });
    if(this.tipo==1){
      this.nombre_tipo="Editar Proyecto: " + this.tipo
    }

  }

}
