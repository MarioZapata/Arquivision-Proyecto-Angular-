import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './Componentes-Reutilizables/sidenav/logout/logout.component';
import { ActividadIndividualComponent } from './modulo-actividades/actividad-individual/actividad-individual.component';
import { ModuloActividadesComponent } from './modulo-actividades/modulo-actividades.component';
import { ModuloMaterialesComponent } from './modulo-materiales/modulo-materiales.component';

import { RastreoMaterialesComponent } from './modulo-materiales/rastreo-materiales/rastreo-materiales.component';
import { ModuloMisActividadesComponent } from './modulo-mis-actividades/modulo-mis-actividades.component';
import { ModuloProyectoEditarComponent } from './modulo-proyectos/modulo-proyecto-editar/modulo-proyecto-editar.component';
import { ModuloUsuariosComponent } from './modulo-usuarios/modulo-usuarios.component';
import { AuthGuard } from './Componentes-Reutilizables/AuthGuard';
import { NuevoMaterialComponent } from './modulo-materiales/nuevo-material/nuevo-material.component';
import { ConfirmacionCorreoComponent } from './modulo-inical/confirmacion-correo/confirmacion-correo.component';

const routes: Routes = [

  { path: 'proyectos', loadChildren: () => import('./modulo-proyectos/routing-proyectos/routing-proyectos.module').then(m => m.RoutingProyectosModule) },
  {path: 'actividades', component: ModuloActividadesComponent, canActivate: [AuthGuard]},
  {path: 'editar-proyectos/:tipo', component: ModuloProyectoEditarComponent, canActivate: [AuthGuard]},
  {path: 'actividad-individual', component: ActividadIndividualComponent, canActivate: [AuthGuard] }, // Nueva ruta
  {path: 'materiales', component: ModuloMaterialesComponent, canActivate: [AuthGuard]},
  {path: 'mis-actividades', component: ModuloMisActividadesComponent, canActivate: [AuthGuard]},
  {path:'usuarios', component: ModuloUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'nuevo-marterial', component: NuevoMaterialComponent,canActivate: [AuthGuard]},
  {path: "rastreo-materiales", component: RastreoMaterialesComponent, canActivate: [AuthGuard]},
 // {path: "inicio", component: ModuloInicalComponent},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: ConfirmacionCorreoComponent }, // Nueva ruta

  // { path: '**', redirectTo: '/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
