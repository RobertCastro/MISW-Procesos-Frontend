import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';
import { EnumsService } from 'src/app/enums.service';
import { TipoMantenimitento } from 'src/app/enums';
import { TipoPeriodicidad } from 'src/app/enums';
import { PropiedadService } from 'src/app/propiedad/propiedad.service';

@Component({
  selector: 'app-mantenimiento-editar',
  templateUrl: './mantenimiento-editar.component.html',
  styleUrls: ['./mantenimiento-editar.component.css']
})
export class MantenimientoEditarComponent implements OnInit {
  @Input() propiedadId: number;
  mantenimientoForm: FormGroup;
  propiedad: any;
  tiposMantenimientos: Array<TipoMantenimitento>;
  tiposPeriodicidad: Array<TipoPeriodicidad>;


  constructor(
    private routerPath: Router,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private mantenimientoService: MantenimientoService,
    private propiedadService: PropiedadService,
    private enumService: EnumsService,
    private formBuilder: FormBuilder) {
      this.mantenimientoForm = this.formBuilder.group({
        tipo_mantenimiento: [null, Validators.required],
        costo: ["", Validators.required],
        periodicidad: ["", Validators.required],
        estado: [null, Validators.required]
      });
     }

  ngOnInit() {
    this.propiedadId = parseInt(this.router.snapshot.params['id']);

    this.enumService.tiposMantenimiento().subscribe((tiposMantenimientos) => {
      this.tiposMantenimientos = tiposMantenimientos;

        this.enumService.tiposPeriodicidad().subscribe((tiposPeriodicidad) => {
          this.tiposPeriodicidad = this.tiposPeriodicidad;

        this.mantenimientoForm = this.formBuilder.group({
          tipo_mantenimiento: [null, Validators.required],
          costo: ["", Validators.required],
          periodicidad: ["", Validators.required],
          estado: [null, Validators.required]
        });
      });
    });
  }

  editarMantenimiento(mantenimiento: Mantenimiento) {
    this.mantenimientoService.editarMantenimiento(mantenimiento, this.propiedadId).subscribe((mantenimiento) => {
      this.toastr.success("Confirmation", "Mantenimiento modificado")
      this.mantenimientoForm.reset();
      this.routerPath.navigate(['/propiedades/' + this.propiedadId + '/mantenimientos']);
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

  cancelarEditarMantenimiento(){
    this.routerPath.navigate(['/propiedades/']);
  }
}
