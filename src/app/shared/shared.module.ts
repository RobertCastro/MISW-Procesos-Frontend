import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MantenimientoListaComponent } from '../mantenimiento/mantenimiento-lista/mantenimiento-lista.component';
import { MantenimientoCrearComponent } from '../mantenimiento/mantenimiento-crear/mantenimiento-crear.component';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    MantenimientoListaComponent,
    MantenimientoCrearComponent
  ],
  exports: [
    MantenimientoListaComponent,
    MantenimientoCrearComponent
  ]
})
export class SharedModule { }
