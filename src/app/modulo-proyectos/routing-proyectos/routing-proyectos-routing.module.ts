import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuloProyectosComponent } from '../modulo-proyectos.component';
import { ModuloNuevoProyectoComponent } from '../modulo-nuevo-proyecto/modulo-nuevo-proyecto.component';
import { ModuloProyectoVerComponent } from '../modulo-proyecto-ver/modulo-proyecto-ver.component';
import { ModuloProyectoEditarComponent } from '../modulo-proyecto-editar/modulo-proyecto-editar.component';

const routes: Routes = [
  { path: '', component: ModuloProyectosComponent },
  { path: 'nuevo', component: ModuloNuevoProyectoComponent },
  {path: 'ver', component: ModuloProyectoVerComponent},
  { path: 'editar/:id', component: ModuloNuevoProyectoComponent },
  { path: 'panel', component: ModuloProyectoEditarComponent }

  // Otras rutas específicas de Proyectos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class RoutingProyectosRoutingModule { }
