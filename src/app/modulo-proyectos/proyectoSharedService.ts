import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectoSharedService {
  private proyecto: any;

  constructor() { }

  setProyecto(proyecto: any) {
    this.proyecto = proyecto;
  }

  getProyecto() {
    return this.proyecto;
  }

  clearProyecto() {
    this.proyecto = null;
  }
}
