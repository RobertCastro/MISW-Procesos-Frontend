import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Propiedad } from '../propiedad';
import { PropiedadService } from '../propiedad.service';
import { EnumsService } from 'src/app/enums.service';
import { Banco } from 'src/app/enums';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Propietario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-propiedad-editar',
  templateUrl: './propiedad-editar.component.html',
  styleUrls: ['./propiedad-editar.component.css']
})
export class PropiedadEditarComponent implements OnInit {

  propiedad: Propiedad
  propiedadForm: FormGroup = {} as FormGroup
  listaBancos: Banco[]
  idPropiedad: number;
  listaPropietarios: Propietario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private propiedadService: PropiedadService,
    private enumService: EnumsService,
    private usuarioService: UsuarioService

  ) {
    this.propiedadForm = this.formBuilder.group({
      nombre_propiedad: ["", Validators.required],
      ciudad: ["", Validators.required],
      municipio: ["", []],
      direccion: ["", Validators.required],
      nombre_propietario: ["", Validators.required],
      numero_contacto: ["", Validators.required],
      banco: ["", []],
      numero_cuenta: ["", []]
    });
   }

  ngOnInit() {

    this.idPropiedad = parseInt(this.router.snapshot.params['id']);

    this.enumService.bancos().subscribe((bancos) => {
      this.listaBancos = bancos;
    });

    //this.listaPropietarios=["Propietario 1", "Propietario 2", "Propietario 3"]
    this.usuarioService.listarPropietarios().subscribe((propietarios) => {
    console.log("Propietarios")
    console.log(propietarios)
    this.listaPropietarios = propietarios;
    });

    this.propiedadService.darPropiedad(this.idPropiedad).subscribe((propiedad) => {
      this.propiedad = propiedad

      this.propiedadForm = this.formBuilder.group({
          nombre_propiedad: [this.propiedad.nombre_propiedad, Validators.required],
          ciudad: [this.propiedad.ciudad, Validators.required],
          municipio: [this.propiedad.municipio, []],
          direccion: [this.propiedad.direccion, Validators.required],
          nombre_propietario: [this.propiedad.nombre_propietario, Validators.required],
          numero_contacto: [this.propiedad.numero_contacto, Validators.required],
          banco: [this.propiedad.banco, []],
          numero_cuenta: [this.propiedad.numero_cuenta, []]
        });


      });

}

  editarPropiedad(cambioPropiedad: Propiedad): void {
    this.propiedadService.editarPropiedad(cambioPropiedad, this.idPropiedad).subscribe((propiedad) => {
      this.toastr.success("Confirmation", "Registro editado")
      this.propiedadForm.reset();
      this.routerPath.navigate(['/propiedades']);
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
    })

  }

  cancelarPropiedad(): void {
    this.propiedadForm.reset();
    this.routerPath.navigate(['/propiedades/']);
  }

}
