import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';
import { By } from '@angular/platform-browser';
import { MantenimientoCrearComponent } from './mantenimiento-crear.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


describe('MantenimientoCrearComponent', () => {
    let component: MantenimientoCrearComponent;
    let fixture: ComponentFixture<MantenimientoCrearComponent>;
    let mockActivatedRoute: any;
    let mockRouter: any;
    let mockToastrService: any;
    let mockTipoMantenimiento: any;
    let mockPeriocidad: any;

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


    await TestBed.configureTestingModule({
        declarations: [MantenimientoCrearComponent],
        imports: [ReactiveFormsModule, HttpClientModule, EncabezadoAppModule],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Router, useValue: mockRouter },
          { provide: ToastrService, useValue: mockToastrService },
        ]
      }).compileComponents();
});

beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCrearComponent);
    component = fixture.componentInstance;
    component.tiposMantenimientos = mockTipoMantenimiento;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have button Cencel with test_id="bot_cancel"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_cancel"]'));
    expect(button).toBeTruthy();
  });

  it('Should have a Tipo Mantenimiento text list', () => {
    const tipo_mantenimiento: HTMLSelectElement = fixture.nativeElement.querySelector('#tipo_mantenimiento');
    expect(tipo_mantenimiento).toBeTruthy();
  });

  it('Should have a periodicidad text list', () => {
    const periodicidad: HTMLSelectElement = fixture.nativeElement.querySelector('#periodicidad');
    expect(periodicidad).toBeTruthy();
  });

  it('Should have a Costo text box', () => {
    const costo: HTMLElement = fixture.nativeElement.querySelector('#costo');
    expect(costo).toBeTruthy();
  });

  it('Should have a estado text box', () => {
    const estado: HTMLElement = fixture.nativeElement.querySelector('#estado');
    expect(estado).toBeTruthy();
  });

});