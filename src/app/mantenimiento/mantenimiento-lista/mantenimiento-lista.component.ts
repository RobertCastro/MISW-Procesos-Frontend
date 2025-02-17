import { Component, Input, OnChanges, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';
import { PropiedadService } from 'src/app/propiedad/propiedad.service';

@Component({
  selector: 'app-mantenimiento-lista',
  templateUrl: './mantenimiento-lista.component.html'
})
export class MantenimientoListaComponent implements OnInit, OnChanges {
  
  @Output() cerrarMantenimientos = new EventEmitter<void>();
  @Input() propiedadId: number;
  mantenimientos: Array<Mantenimiento>;
  propiedad: any;
  usuarioEsPropietario: boolean = true;

  constructor(
    private routerPath: Router,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private propiedadService: PropiedadService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('rol') == "ADMINISTRADOR"){
      this.usuarioEsPropietario = false;
    }
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
        this.cargarPropiedad(this.propiedadId);
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

  crearMantenimiento(idPropiedad: number): void {
    this.routerPath.navigate(['/mantenimientos/'+ idPropiedad + '/crear']);
  }

  editarMantenimiento(idPropiedad: number,idMantenimiento: number): void {
    this.routerPath.navigate(['/propiedades/'+idPropiedad+'/mantenimientos/'+ idMantenimiento +'/editar']);
  }

  cerrarListaMantenimientos(): void {
    this.cerrarMantenimientos.emit();
  }
  
}
