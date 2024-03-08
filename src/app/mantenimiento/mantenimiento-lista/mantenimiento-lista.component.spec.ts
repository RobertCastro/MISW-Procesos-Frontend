import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoListaComponent } from './mantenimiento-lista.component';
import { MantenimientoService } from '../mantenimiento.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('MantenimientoListaComponent', () => {
  let component: MantenimientoListaComponent;
  let fixture: ComponentFixture<MantenimientoListaComponent>;
  let mantenimientoServiceSpy: jasmine.SpyObj<MantenimientoService>;

  beforeEach(async () => {
    mantenimientoServiceSpy = jasmine.createSpyObj('MantenimientoService', ['obtenerMantenimientos']);
    mantenimientoServiceSpy.obtenerMantenimientos.and.returnValue(of([
      { 
        id: 1,
        id_propiedad: 1,
        id_usuario: 1,
        costo: 1000,
        tipo_mantenimiento: 'ARREGLO',
        periodicidad: 'MENSUAL',
        estado: true 
      }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ MantenimientoListaComponent ],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: MantenimientoService, useValue: mantenimientoServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoListaComponent);
    component = fixture.componentInstance;
    component.propiedadId = 1;
    fixture.detectChanges();
  });

  it('debe mostrar el título "Mantenimientos" en el componente', () => {
    const h4Elements = fixture.debugElement.queryAll(By.css('h4'));
    expect(h4Elements.length).toBeGreaterThanOrEqual(2, 'Deberían haber al menos dos elementos h4 en el DOM');
    const segundoH4 = h4Elements[1].nativeElement.innerText;
    expect(segundoH4).toContain('Mantenimientos', 'El segundo título h4 debería ser "Mantenimientos"');
  });
  
});
