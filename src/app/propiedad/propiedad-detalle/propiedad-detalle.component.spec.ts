import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PropiedadListaComponent } from '../propiedad-lista/propiedad-lista.component';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';
import { PropiedadDetalleComponent } from './propiedad-detalle.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { PropiedadService } from '../propiedad.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('PropiedadDetalleComponent', () => {
  let listaComponent: PropiedadListaComponent;
  let listaFixture: ComponentFixture<PropiedadListaComponent>;
  let propiedadService: jasmine.SpyObj<PropiedadService>;
  let propiedadServiceSpy: jasmine.SpyObj<PropiedadService>;

  beforeEach(async () => {
    propiedadServiceSpy = jasmine.createSpyObj('PropiedadService', ['darPropiedad', 'darPropiedades']);
    propiedadServiceSpy.darPropiedades.and.returnValue(of([{ id: 1, nombre_propiedad: 'Propiedad 1', ciudad: 'Bogotá', municipio: 'Bogotá', direccion: 'Calle 123', nombre_propietario: 'Propietario 1', numero_contacto: '56732452', banco: 'DAVIPLATA', numero_cuenta: '6854573457486' }]));
    propiedadServiceSpy.darPropiedad.and.returnValue(of({ id: 1, nombre_propiedad: 'Propiedad 1', ciudad: 'Bogotá', municipio: 'Bogotá', direccion: 'Calle 123', nombre_propietario: 'Propietario 1', numero_contacto: '56732452', banco: 'DAVIPLATA', numero_cuenta: '6854573457486' }));

    await TestBed.configureTestingModule({
      declarations: [ PropiedadDetalleComponent, PropiedadListaComponent ],
      imports: [ 
        RouterTestingModule,
        ToastrModule.forRoot(),
        EncabezadoAppModule
       ],
      providers: [
        { provide: PropiedadService, useValue: propiedadServiceSpy  },
      ]
    }).compileComponents();

    listaFixture = TestBed.createComponent(PropiedadListaComponent);
    listaComponent = listaFixture.componentInstance;
  });

  it('debe mostrar el componente de detalle con los datos correctos después de hacer clic en el botón "ver"', fakeAsync(() => {
    listaFixture.detectChanges();
    tick();

    const botVerButtons = listaFixture.debugElement.queryAll(By.css('[test-id="bot_ver"]'));
    expect(botVerButtons.length).toBeGreaterThan(0, 'Debería haber al menos un botón para "ver" la propiedad');
    const botVer = botVerButtons[0];
    botVer.triggerEventHandler('click', null);
    tick();

    listaFixture.detectChanges();

    const detalleComponentDebugEl = listaFixture.debugElement.query(By.directive(PropiedadDetalleComponent));
    expect(detalleComponentDebugEl).toBeTruthy('El componente de detalle debería mostrarse');

    const detalleComponentInstance = detalleComponentDebugEl.componentInstance as PropiedadDetalleComponent;
    expect(detalleComponentInstance.propiedad).toBeTruthy('Los datos de la propiedad deberían estar presentes');
    expect(detalleComponentInstance.propiedad.ciudad).toEqual('Bogotá', 'La ciudad de la propiedad debería ser "Bogotá"');
    expect(detalleComponentInstance.propiedad.nombre_propiedad).toEqual('Propiedad 1', 'El nombre de la propiedad debe ser "Propiedad 1"');
    expect(detalleComponentInstance.propiedad.direccion).toEqual('Calle 123', 'La dirección de la propiedad debe ser "Calle 123"');
    expect(detalleComponentInstance.propiedad.nombre_propietario).toEqual('Propietario 1', 'El nombre del propietario debe ser "Propietario 1"');
    expect(detalleComponentInstance.propiedad.numero_contacto).toEqual('56732452', 'El número de contacto debe ser "56732452"');
    expect(detalleComponentInstance.propiedad.banco).toEqual('DAVIPLATA', 'El banco de la propiedad debe ser "DAVIPLATA"');


  }));
});

