import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';
import { EnumsService } from 'src/app/enums.service';
import { TipoMantenimitento } from 'src/app/enums';
import { Periocidad } from 'src/app/enums';
import { PropiedadService } from 'src/app/propiedad/propiedad.service';

@Component({
  selector: 'app-mantenimiento-crear',
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {
  @Input() propiedadId: number;
  mantenimientoForm: FormGroup;
  propiedad: any;
  tiposMantenimientos: Array<TipoMantenimitento>;
  listaPeriocidad: Array<Periocidad>;


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

        this.enumService.listaPeriocidad().subscribe((listaPeriocidad) => {
          this.listaPeriocidad = this.listaPeriocidad;

        this.mantenimientoForm = this.formBuilder.group({
          tipo_mantenimiento: [null, Validators.required],
          costo: ["", Validators.required],
          periodicidad: ["", Validators.required],
          estado: [null, Validators.required]
        });
      });
    });
  }

  crearMantenimiento(mantenimiento: Mantenimiento) {
    this.mantenimientoService.crearMantenimiento(mantenimiento, this.propiedadId).subscribe((mantenimiento) => {
      this.toastr.success("Confirmation", "Mantenimiento creado")
      this.mantenimientoForm.reset();
      // this.routerPath.navigate(['/propiedades/' + this.propiedadId + '/mantenimientos']);
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

  cancelarCrearMantenimiento(){
    this.routerPath.navigate(['/propiedades/']);
  }
}
