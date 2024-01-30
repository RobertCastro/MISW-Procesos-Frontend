import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Propiedad } from '../propiedad';
import { PropiedadService } from '../propiedad.service';

@Component({
  selector: 'app-propiedad-lista',
  templateUrl: './propiedad-lista.component.html',
  styleUrls: ['./propiedad-lista.component.css']
})
export class PropiedadListaComponent implements OnInit {

  propiedades: Array<Propiedad> = []
  propiedadElegida: Propiedad

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private propiedadService: PropiedadService
  ) { }

  ngOnInit() {
    this.propiedadService.darPropiedades().subscribe((propiedades) => {
      this.propiedades = propiedades;
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

  crearPropiedad():void {
    this.routerPath.navigate(['/propiedad/crear/']);
  }

  movimientos(idPropiedad: number): void {
    this.routerPath.navigate(['/propiedades/'+ idPropiedad + '/movimientos']);
  }

  editarPropiedad(idPropiedad: number):void {
    this.routerPath.navigate(['/propiedad/editar/' + idPropiedad]);
  }

  borrarPropiedad(idPropiedad: number):void {
    this.propiedadService.borrarPropiedad(idPropiedad).subscribe((receta) => {
      this.toastr.success("Confirmation", "Registro eliminado de la lista")
      this.ngOnInit();
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

}
