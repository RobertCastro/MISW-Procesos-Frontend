import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';
import { PropiedadService } from 'src/app/propiedad/propiedad.service';

@Component({
  selector: 'app-mantenimiento-lista',
  templateUrl: './mantenimiento-lista.component.html'
})
export class MantenimientoListaComponent implements OnInit, OnChanges {
  
  @Input() propiedadId: number;
  mantenimientos: Array<Mantenimiento>;
  propiedad: any;

  constructor(
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private propiedadService: PropiedadService
  ) { }

  ngOnInit() {
    this.cargarMantenimientos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['propiedadId'] && !changes['propiedadId'].isFirstChange()) {
      this.cargarMantenimientos();
    }
  }

  obtenerPropiedad(idPropiedad: number) {
    return this.propiedadService.darPropiedad(idPropiedad);
  }


  cargarMantenimientos() {
    if (this.propiedadId) {
      this.mantenimientoService.obtenerMantenimientos(this.propiedadId).subscribe((mantenimientos) => {
        this.mantenimientos = mantenimientos;
        this.cargarPropiedad(this.propiedadId); // Llama a cargarPropiedad para obtener los detalles de la propiedad
      }, error => {
        this.toastr.error("Error", "Ha ocurrido un error al cargar los mantenimientos. " + error.message);
      });
    }
  }
  
  cargarPropiedad(idPropiedad: number) {
    this.propiedadService.darPropiedad(idPropiedad).subscribe((propiedad) => {
      this.propiedad = propiedad;
    }, error => {
      this.toastr.error("Error", "Ha ocurrido un error al cargar los detalles de la propiedad. " + error.message);
    });
  }
  
}
