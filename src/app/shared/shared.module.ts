import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MantenimientoListaComponent } from '../mantenimiento/mantenimiento-lista/mantenimiento-lista.component';
import { MantenimientoCrearComponent } from '../mantenimiento/mantenimiento-crear/mantenimiento-crear.component';
import { MantenimientoEditarComponent } from '../mantenimiento/mantenimiento-editar/mantenimiento-editar.component';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    MantenimientoListaComponent,
    MantenimientoCrearComponent,
    MantenimientoEditarComponent
  ],
  exports: [
    MantenimientoListaComponent,
    MantenimientoCrearComponent,
    MantenimientoEditarComponent
  ]
})
export class SharedModule { }
