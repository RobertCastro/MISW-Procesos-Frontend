import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovimientoService } from '../movimiento.service';
import { MovimientoListaComponent } from './movimiento-lista.component';
import { of } from 'rxjs';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';
import { By } from '@angular/platform-browser';

describe('MovimientoListaComponent', () => {
  let component: MovimientoListaComponent;
  let fixture: ComponentFixture<MovimientoListaComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockToastrService: any;
  let mockMovimientoService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '123' // Assuming id is provided in the snapshot
        }
      }
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockToastrService = jasmine.createSpyObj(['success', 'error']);

    mockMovimientoService = jasmine.createSpyObj('MovimientoService', ['obtenerMovimientos']);
    mockMovimientoService.obtenerMovimientos.and.returnValue(of([
        { id: 1, id_propiedad: 1, id_reserva: 2, concepto: "RESERVA", valor: 20500, fecha: new Date('2024-01-14 15:00:00.000000'), tipo_movimiento: 'INGRESO' },
        { id: 2, id_propiedad: 1, id_reserva: 2, concepto: 'LIMPIEZA', valor: 200, fecha: new Date('2024-01-14 15:00:00.000000'), tipo_movimiento: 'EGRESO' }
      ]));

    await TestBed.configureTestingModule({
      declarations: [MovimientoListaComponent],
      imports: [EncabezadoAppModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MovimientoService, useValue: mockMovimientoService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable buttons when usuarioEsPropietario is true', () => {
    component.usuarioEsPropietario = true;
    fixture.detectChanges();
    const boton_crear = fixture.debugElement.query(By.css('[test-id="bot_crear"]'));
    const boton_borrar_ing = fixture.debugElement.query(By.css('[test-id="bot_borrar_ing"]'));
    const boton_editar_ing = fixture.debugElement.query(By.css('[test-id="bot_editar_ing"]'));
    const boton_borrar_egr = fixture.debugElement.query(By.css('[test-id="bot_borrar_egr"]'));
    const boton_editar_egr = fixture.debugElement.query(By.css('[test-id="bot_editar_egr"]'));
    expect(boton_crear).toBeFalsy();
    expect(boton_borrar_ing).toBeFalsy();
    expect(boton_editar_ing).toBeFalsy();
    expect(boton_borrar_egr).toBeFalsy();
    expect(boton_editar_egr).toBeFalsy();
  });

  it('should enable buttons when usuarioEsPropietario is true', () => {
    component.usuarioEsPropietario = false;
    fixture.detectChanges();
    const boton_crear = fixture.debugElement.query(By.css('[test-id="bot_crear"]'));
    const boton_borrar_ing = fixture.debugElement.query(By.css('[test-id="bot_borrar_ing"]'));
    const boton_editar_ing = fixture.debugElement.query(By.css('[test-id="bot_editar_ing"]'));
    const boton_borrar_egr = fixture.debugElement.query(By.css('[test-id="bot_borrar_egr"]'));
    const boton_editar_egr = fixture.debugElement.query(By.css('[test-id="bot_editar_egr"]'));
    expect(boton_crear).toBeTruthy();
    expect(boton_borrar_ing).toBeTruthy();
    expect(boton_editar_ing).toBeTruthy();
    expect(boton_borrar_egr).toBeTruthy();
    expect(boton_editar_egr).toBeTruthy();
  });
});
