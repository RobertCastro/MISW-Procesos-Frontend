/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropiedadCrearComponent } from './propiedad-crear.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';


describe('PropiedadCrearComponent', () => {
  let component: PropiedadCrearComponent;
  let fixture: ComponentFixture<PropiedadCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot({positionClass :'toast-bottom-right'},),
      HttpClientModule,
      EncabezadoAppModule
      ],
      declarations: [ PropiedadCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the component crear propiedad', () => {
    expect(component).toBeTruthy();
  });

  it('Should have button Submit with test_id="bot_submit"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_submit"]'));
    expect(button).toBeTruthy();
  });

  it('Should have button Cencel with test_id="bot_cancel"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_cancel"]'));
    expect(button).toBeTruthy();
  });

  it('Should have a Nombre Propiedad text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#nombre_propiedad');
    expect(name).toBeTruthy();
  });

  it('should display error message when Nombre Propiedad field is touched and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#nombre_propiedad'));
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.alert.alert-danger'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Contenido requerido');
  });

  it('Should have a ciudad text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#ciudad');
    expect(name).toBeTruthy();
  });

  it('should display error message when Ciudad field is touched and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#ciudad')); // Selecting the input element
    inputElement.nativeElement.dispatchEvent(new Event('blur')); // Simulating blur event
    fixture.detectChanges(); // Updating the component

    const errorMessage = fixture.debugElement.query(By.css('.alert.alert-danger')); // Selecting the error message element
    expect(errorMessage).toBeTruthy(); // Asserting that the error message exists
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Por favor diligencie este campo'); // Asserting the content of the error message
  });

  it('Should have a municipio text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#municipio');
    expect(name).toBeTruthy();
  });

  it('Should have a direccion text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#direccion');
    expect(name).toBeTruthy();
  });

  it('should display error message when Dirección field is touched and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#direccion')); // Selecting the input element
    inputElement.nativeElement.dispatchEvent(new Event('blur')); // Simulating blur event
    fixture.detectChanges(); // Updating the component

    const errorMessage = fixture.debugElement.query(By.css('.alert.alert-danger')); // Selecting the error message element
    expect(errorMessage).toBeTruthy(); // Asserting that the error message exists
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Por favor diligencie este campo'); // Asserting the content of the error message
  });

  it('Should have a nombre del propietario text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#nombre_propietario');
    expect(name).toBeTruthy();
  });

  it('should display error message when nombre del propietario field is touched and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#nombre_propietario'));
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.alert.alert-danger'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Contenido requerido');
  });

  it('Should have a numero de contacto text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#numero_contacto');
    expect(name).toBeTruthy();
  });

  it('should display error message when numero de contacto field is touched and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#numero_contacto'));
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.alert.alert-danger'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Contenido requerido');
  });

  it('Should have a numero de cuenta text box', () => {
    const name: HTMLElement = fixture.nativeElement.querySelector('#numero_cuenta');
    expect(name).toBeTruthy();
  });

});
