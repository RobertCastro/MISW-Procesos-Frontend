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
  @Input() idMantenimiento: number;
  @Input() idPropiedad: number;
  mantenimientoForm: FormGroup;
  tiposMantenimientos: Array<TipoMantenimitento>;
  tiposPeriodicidad: Array<TipoPeriodicidad>;
  mantenimiento: Mantenimiento;

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
        costo :['', Validators.compose([Validators.required, Validators.min(0)])],
        periodicidad: ["", Validators.required],
        estado: [null, Validators.required]
      });
     }

  ngOnInit() {
     this.idPropiedad = parseInt(this.router.snapshot.params['id_propiedad']);
     this.idMantenimiento = parseInt(this.router.snapshot.params['id_mantenimiento']);

    this.enumService.tiposMantenimiento().subscribe((tiposMantenimientos) => {
      this.tiposMantenimientos = tiposMantenimientos;

        this.enumService.tiposPeriodicidad().subscribe((tiposPeriodicidad) => {
          this.tiposPeriodicidad = tiposPeriodicidad;

          this.mantenimientoService.obtenerMantenimiento(this.idMantenimiento).subscribe((mantenimiento) => {
            let estado_num: number = mantenimiento.estado ? 1 : 0;
            
            this.mantenimientoForm = this.formBuilder.group({
              tipo_mantenimiento: [mantenimiento.tipo_mantenimiento, Validators.required],
              costo :[mantenimiento.costo, Validators.compose([Validators.required, Validators.min(0)])],
              periodicidad: [mantenimiento.periodicidad, []],
              estado: [estado_num, []]
            });
      
           });

      });
    });

      
  }

  editarMantenimiento(mantenimiento: Mantenimiento,idPropiedad: number) {
      mantenimiento.id_propiedad = this.idPropiedad;  
      mantenimiento.id_usuario = parseInt(sessionStorage.getItem('idUsuario'));
      mantenimiento.id = this.idMantenimiento;

      this.mantenimientoService.editarMantenimiento(mantenimiento,this.idMantenimiento,idPropiedad).subscribe((mantenimiento) => {
      this.toastr.success("Confirmation", "Mantenimiento modificado")
      this.mantenimientoForm.reset();
      this.routerPath.navigate(['/propiedades/']);
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
