import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActividadShared {
  private actividad: any;
  private tipo :number | null= null;

  constructor() { }

  setActividad(proyecto: any, tipo: number) {
    this.actividad = proyecto;
    this.tipo = tipo
  }

  getActividad() {
    return this.actividad;
  }
  getTipo() {
    return this.tipo;
  }

  clearAct() {
    this.actividad = null;
    this.tipo = null;
  }
}