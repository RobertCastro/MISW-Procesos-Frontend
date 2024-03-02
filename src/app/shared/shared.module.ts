import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoListaComponent } from '../mantenimiento/mantenimiento-lista/mantenimiento-lista.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MantenimientoListaComponent
  ],
  exports: [
    MantenimientoListaComponent
  ]
})
export class SharedModule { }
