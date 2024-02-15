import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Propiedad } from '../propiedad';
import { PropiedadService } from '../propiedad.service';
import { Banco } from 'src/app/enums';
import { EnumsService } from 'src/app/enums.service';

@Component({
  selector: 'app-propiedad-crear',
  templateUrl: './propiedad-crear.component.html',
  styleUrls: ['./propiedad-crear.component.css']
})
export class PropiedadCrearComponent implements OnInit {
  @Output() cancelarCrearPropiedad: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitCrearPropiedad: EventEmitter<void> = new EventEmitter<void>();
  propiedadForm: FormGroup;
  listaBancos: Banco[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private propiedadService: PropiedadService,
    private enumService: EnumsService
  ) { 
    this.propiedadForm = this.formBuilder.group({
      nombre_propiedad: ["", Validators.required],
      ciudad: ["", Validators.required],
      municipio: ["", []],
      direccion: ["", Validators.required],
      nombre_propietario: ["", Validators.required],
      numero_contacto: ["", Validators.required],
      banco: [null, []],
      numero_cuenta: ["", []]
    });
  }

  ngOnInit() {

    this.enumService.bancos().subscribe((bancos) => {
      this.listaBancos = bancos;

      this.propiedadForm = this.formBuilder.group({
        nombre_propiedad: ["", Validators.required],
        ciudad: ["", Validators.required],
        municipio: ["", []],
        direccion: ["", Validators.required],
        nombre_propietario: ["", Validators.required],
        numero_contacto: ["", Validators.required],
        banco: [null, []],
        numero_cuenta: ["", []]
      });
    });

  }

  crearPropiedad(nuevaPropiedad: Propiedad): void {
    this.propiedadService.crearPropiedad(nuevaPropiedad).subscribe((propiedad) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.propiedadForm.reset();
      this.routerPath.navigate(['/propiedades/']);
      this.submitCrearPropiedad.emit();
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. ")
      }
    })

  }

  cancelarPropiedad(): void {
    this.propiedadForm.reset();
    this.cancelarCrearPropiedad.emit();
  }


}
