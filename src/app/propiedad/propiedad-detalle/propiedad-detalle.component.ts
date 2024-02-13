import { Component, OnInit,  Input } from '@angular/core';

@Component({
  selector: 'app-propiedad-detalle',
  templateUrl: './propiedad-detalle.component.html',
  styleUrls: ['./propiedad-detalle.css']
})
export class PropiedadDetalleComponent implements OnInit {


  constructor() { }

  @Input() propiedadId: number;

  ngOnInit(): void {
    this.cargarDetallePropiedad(this.propiedadId);
  }

  cargarDetallePropiedad(id: number) {
    // return this.http.get<Propiedad>(`/api/propiedades/${id}`);
  }
  

}