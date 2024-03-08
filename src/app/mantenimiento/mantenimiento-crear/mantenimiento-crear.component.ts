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
  selector: 'app-mantenimiento-crear',
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {
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
        estado: ["", Validators.required]
      });
     }

  ngOnInit() {

    this.propiedadId = this.router.snapshot.params['id'];

    this.enumService.tiposMantenimiento().subscribe((tiposMantenimientos) => {
      this.tiposMantenimientos = tiposMantenimientos;

        this.enumService.tiposPeriodicidad().subscribe((tiposPeriodicidad) => {
          this.tiposPeriodicidad = tiposPeriodicidad;

        this.mantenimientoForm = this.formBuilder.group({
          tipo_mantenimiento: [null, Validators.required],
          costo: ["", Validators.required],
          periodicidad: ["", Validators.required],
          estado: ["", Validators.required]
        });
      });
    });
  }


  crearMantenimiento(mantenimiento: Mantenimiento) {
    mantenimiento.id_propiedad = this.propiedadId;
    mantenimiento.id_usuario = parseInt(sessionStorage.getItem('idUsuario'));
    this.mantenimientoService.crearMantenimiento(mantenimiento, this.propiedadId).subscribe({
      next: (mantenimientoCreado) => {
        this.toastr.success("Mantenimiento creado exitosamente");
        this.routerPath.navigate(['/propiedades/']);
      },
      error: (error) => {
        console.error("Error al crear el mantenimiento", error);
        if (error.statusText === "UNAUTHORIZED") {
          this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        }
        else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        }
        else {
          this.toastr.error("Error","Ha ocurrido un error. " + error.message)
        }
      }
    });
  }
  

  cancelarCrearMantenimiento(){
    this.routerPath.navigate(['/propiedades/']);
  }
}
