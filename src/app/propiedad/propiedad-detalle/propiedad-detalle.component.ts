import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropiedadService } from '../propiedad.service';
import { Propiedad } from '../propiedad';

@Component({
  selector: 'app-propiedad-detalle',
  templateUrl: './propiedad-detalle.component.html',
  styleUrls: ['./propiedad-detalle.css']
})
export class PropiedadDetalleComponent implements OnInit {
  @Input() propiedadId: number;
  propiedad: Propiedad;

  constructor(private propiedadService: PropiedadService) { }

  ngOnInit(): void {
    this.loadPropertyDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propiedadId']) {
      this.loadPropertyDetails();
    }
  }

  loadPropertyDetails() {
    if (this.propiedadId) {
      this.cargarDetallePropiedad(this.propiedadId);
    }
  }

  cargarDetallePropiedad(id: number) {
    this.propiedadService.darPropiedad(id).subscribe({
      next: (data) => this.propiedad = data,
      error: (error) => console.error('Error al obtener los detalles de la propiedad', error)
    });
  }
}
