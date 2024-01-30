import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../reserva';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva-editar',
  templateUrl: './reserva-editar.component.html',
  styleUrls: ['./reserva-editar.component.css']
})
export class ReservaEditarComponent implements OnInit {

  reserva: Reserva
  reservaForm: FormGroup = {} as FormGroup
  idPropiedad: number
  idReserva: number

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private reservaService: ReservaService
  ) { 
    this.reservaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      fecha_ingreso: ["", [Validators.required, Validators.minLength(2)]],
      fecha_salida: ["", [Validators.required, Validators.minLength(2)]],
      comision: ["", Validators.required],
      total_reserva: ["", Validators.required],
      plataforma_reserva: ["", [Validators.required, Validators.minLength(2)]],
      numero_personas: [],
      observaciones: []
      });
  }

  ngOnInit() {
    this.idReserva = parseInt(this.router.snapshot.params['id_reserva']);
    this.reservaService.obtenerReserva(this.idReserva).subscribe((reserva) => {
      this.reserva = reserva;
      this.reservaForm = this.formBuilder.group({
        nombre: [this.reserva.nombre, [Validators.required, Validators.minLength(2)]],
        fecha_ingreso: [this.reserva.fecha_ingreso, [Validators.required, Validators.minLength(2)]],
        fecha_salida: [this.reserva.fecha_salida, [Validators.required, Validators.minLength(2)]],
        comision: [Number(this.reserva.comision), Validators.required],
        total_reserva: [Number(this.reserva.total_reserva), Validators.required],
        plataforma_reserva: [this.reserva.plataforma_reserva, [Validators.required, Validators.minLength(2)]],
        numero_personas: [this.reserva.numero_personas],
        observaciones: [this.reserva.observaciones]
        });
    });
  }

  editarReserva(reserva: Reserva): void {
    this.reservaService.editarReserva(reserva, this.idReserva).subscribe((reserva) => {
      this.toastr.success("Confirmation", "Información editada")
      this.reservaForm.reset();
      this.routerPath.navigate(['/propiedades/' + this.reserva.id_propiedad + '/reservas']);
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

  cancelarEditarReserva(): void {
    this.reservaForm.reset();
    this.routerPath.navigate(['/propiedades/' + this.reserva.id_propiedad + '/reservas']);
  }


}
