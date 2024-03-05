import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';
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

  constructor(
    private routerPath: Router,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private propiedadService: PropiedadService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mantenimientoForm = this.formBuilder.group({
      tipo_mantenimiento: [null, Validators.required],
      costo: ["", Validators.required],
      periodicidad: ["", Validators.required],
      estado: [null, Validators.required]
    });
  }

  crearMantenimiento() {
    console.log(this.mantenimientoForm.value);
    this.mantenimientoForm.reset();
  }

  cancelarCrearMantenimiento(){
    this.routerPath.navigate(['/propiedades/']);
  }
}
