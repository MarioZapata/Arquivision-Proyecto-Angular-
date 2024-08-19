import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BarraEnvioComponent } from './Componentes-Reutilizables/barra-envio/barra-envio.component';
import { BodyComponent } from './Componentes-Reutilizables/body/body.component';
import { LogoutComponent } from './Componentes-Reutilizables/sidenav/logout/logout.component';
import { SidenavComponent } from './Componentes-Reutilizables/sidenav/sidenav.component';
import { ActividadIndividualComponent } from './modulo-actividades/actividad-individual/actividad-individual.component';
import { ModuloActividadesComponent } from './modulo-actividades/modulo-actividades.component';
import { ModuloInicalComponent } from './modulo-inical/modulo-inical.component';
import { ModuloLoginComponent } from './modulo-inical/modulo-login/modulo-login.component';
import { ModuloRegistroComponent } from './modulo-inical/modulo-registro/modulo-registro.component';
import { ModuloMaterialesComponent } from './modulo-materiales/modulo-materiales.component';
import { RastreoMaterialesComponent } from './modulo-materiales/rastreo-materiales/rastreo-materiales.component';
import { ModuloMisActividadesComponent } from './modulo-mis-actividades/modulo-mis-actividades.component';
import { ModuloNuevoProyectoComponent } from './modulo-proyectos/modulo-nuevo-proyecto/modulo-nuevo-proyecto.component';
import { ModuloProyectoEditarComponent } from './modulo-proyectos/modulo-proyecto-editar/modulo-proyecto-editar.component';
import { ModuloProyectosComponent } from './modulo-proyectos/modulo-proyectos.component';
import { ModuloUsuariosComponent } from './modulo-usuarios/modulo-usuarios.component';
import { ConfirmacionCorreoComponent } from './modulo-inical/confirmacion-correo/confirmacion-correo.component';
import { NuevoMaterialComponent } from './modulo-materiales/nuevo-material/nuevo-material.component';
import { ModuloProyectoVerComponent } from './modulo-proyectos/modulo-proyecto-ver/modulo-proyecto-ver.component';
import { OrderByPipe } from './order-by.pipe';
import { VerPedidoComponent } from './modulo-materiales/ver-pedido/ver-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ModuloProyectosComponent,
    ModuloActividadesComponent,
    ModuloLoginComponent,
    ModuloProyectoEditarComponent,
    ActividadIndividualComponent,
    ModuloMaterialesComponent,
    ModuloMisActividadesComponent,
    ModuloUsuariosComponent,
    NuevoMaterialComponent,
    BarraEnvioComponent,
    RastreoMaterialesComponent,
    ModuloInicalComponent,
    ModuloRegistroComponent,
    LogoutComponent,
    ModuloNuevoProyectoComponent,
    ConfirmacionCorreoComponent,
    ModuloProyectoVerComponent,
    OrderByPipe,
    VerPedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
     
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
