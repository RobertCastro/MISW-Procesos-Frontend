//this runs with the command (terminal): ng test --include='**/mantenimiento-editar.component.spec.ts'

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoEditarComponent } from './mantenimiento-editar.component';
import { MantenimientoService } from '../mantenimiento.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FormArray,FormBuilder, FormsModule,ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';
import { EnumsService } from 'src/app/enums.service';

describe('MantenimientoEditarComponent', () => {
  let component: MantenimientoEditarComponent;
  let fixture: ComponentFixture<MantenimientoEditarComponent>;
  let mantenimientoServiceSpy: jasmine.SpyObj<MantenimientoService>;
  let tiposMantenimientoSpy: jasmine.SpyObj<EnumsService>;
  let listaPeriodicidadSpy: jasmine.SpyObj<EnumsService>;

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

    tiposMantenimientoSpy=jasmine.createSpyObj('EnumsService',['tiposMantenimiento']);
    tiposMantenimientoSpy.tiposMantenimiento.and.returnValue(of(['ARREGLO', 'MANTENIMIENTO_GENERAL', 'AIRE_ACONDICIONADO','LIMPIEZA']));
    
    listaPeriodicidadSpy=jasmine.createSpyObj('EnumsService',['tiposPeriodicidad']);
    listaPeriodicidadSpy.tiposPeriodicidad.and.returnValue(of(['MENSUAL', 'SEMANAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL']));

    await TestBed.configureTestingModule({
      declarations: [ MantenimientoEditarComponent ],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule, 
        EncabezadoAppModule
      ],
      providers: [
        FormBuilder,
        { provide: MantenimientoService, useValue: mantenimientoServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEditarComponent);
    component = fixture.componentInstance;
    component.idPropiedad = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('Should have a title h1 with the text "Editar Mantenimiento"', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toBe('Editar Mantenimiento');
  });

  it('Should have  formControlName="tipo_mantenimiento" in the form', () => {
    const form = fixture.debugElement.query(By.css('[id="tipo_mantenimiento"]'));
    expect(form).toBeTruthy();
  });

  it('Should have  formControlName="costo" in the form', () => {
    const form = fixture.debugElement.query(By.css('[id="costo"]'));
    expect(form).toBeTruthy();
  });

  it('Should have  formControlName="periodicidad" in the form', () => {
    const form = fixture.debugElement.query(By.css('[id="periodicidad"]'));
    expect(form).toBeTruthy();
  });

  it('should select a periodicidad', () => {
    const selectElement = fixture.debugElement.query(By.css('#periodicidad'));
    component.mantenimientoForm.controls['periodicidad'].setValue('MENSUAL');
    selectElement.triggerEventHandler('change', null);
    fixture.detectChanges();
    expect(component.mantenimientoForm.controls['periodicidad'].value).toEqual('MENSUAL');
  });
  
});
