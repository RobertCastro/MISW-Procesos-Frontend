import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';

@Component({
  selector: 'app-mantenimiento-lista',
  templateUrl: './mantenimiento-lista.component.html'
})
export class MantenimientoListaComponent implements OnInit {
  
  @Input() propiedadId: number;

  

  mantenimientos: Array<Mantenimiento>;

  constructor(
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService
  ) { }

  ngOnInit() {
    if (this.propiedadId) {
      console.log(this.propiedadId);
      this.mantenimientoService.obtenerMantenimientos(this.propiedadId).subscribe((mantenimientos) => {
        this.mantenimientos = mantenimientos;
      },
      error => {
        // Manejo de errores
        this.toastr.error("Error", "Mensaje de error adecuado según el caso");
      });
    }
  }

}
