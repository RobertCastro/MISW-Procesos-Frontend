import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { PropiedadListaComponent } from './propiedad-lista/propiedad-lista.component';
import { PropiedadCrearComponent } from './propiedad-crear/propiedad-crear.component';
import { PropiedadEditarComponent } from './propiedad-editar/propiedad-editar.component';
import { PropiedadDetalleComponent } from './propiedad-detalle/propiedad-detalle.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule,
    SharedModule 
  ],
  declarations: [
    PropiedadListaComponent,
    PropiedadCrearComponent,
    PropiedadEditarComponent,
    PropiedadDetalleComponent
  ],
  exports: [
    PropiedadListaComponent,
    PropiedadCrearComponent,
    PropiedadEditarComponent,
    PropiedadDetalleComponent
  ]
})
export class PropiedadModule { }
