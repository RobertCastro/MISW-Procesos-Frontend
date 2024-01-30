import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../reserva';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva-lista',
  templateUrl: './reserva-lista.component.html',
  styleUrls: ['./reserva-lista.component.css']
})
export class ReservaListaComponent implements OnInit {

  reservas:Array<Reserva> = []
  idPropiedad: number;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.idPropiedad = parseInt(this.router.snapshot.params['id']);
    this.reservaService.obtenerReservas(this.idPropiedad).subscribe((reservas) => {
      this.reservas = reservas;
    })
  }

  crearReserva():void {
    this.routerPath.navigate(['propiedades/' + this.idPropiedad + '/reserva/crear/']);
  }

  editarReserva(idReserva: number):void {
    this.routerPath.navigate(['propiedades/' + this.idPropiedad + '/reserva/editar/' + idReserva]);
  }

  borrarReserva(idReserva: number):void {
    this.reservaService.borrarReserva(idReserva).subscribe(() => {
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
