import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRegistroComponent } from './usuario-registro.component';
import { UsuarioService } from '../usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';


describe('UsuarioRegistroComponentTest', () => {
  let component: UsuarioRegistroComponent;
  let fixture: ComponentFixture<UsuarioRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRegistroComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers:[UsuarioService, ToastrService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the user registration form', () => {
    // Verifica que el formulario se haya creado
    expect(component.usuarioForm).toBeDefined();

    // Verifica que el formulario contenga los campos esperados
    expect(component.usuarioForm.get('tipoUsuario')).toBeDefined();
    expect(component.usuarioForm.get('usuario')).toBeDefined();
    expect(component.usuarioForm.get('password')).toBeDefined();
    expect(component.usuarioForm.get('confirmPassword')).toBeDefined();
    expect(component.usuarioForm.get('confirmPassword')).toBeDefined();
    expect(component.usuarioForm.get('nombre')).toBeDefined();
    expect(component.usuarioForm.get('apellidos')).toBeDefined();
    expect(component.usuarioForm.get('tipoIdentificacion')).toBeDefined();
    expect(component.usuarioForm.get('numeroIdentificacion')).toBeDefined();
    expect(component.usuarioForm.get('correo')).toBeDefined();
    expect(component.usuarioForm.get('celular')).toBeDefined();
  });

  it('should validate tipoUsuario field', () => {
    const tipoUsuarioControl = component.usuarioForm.get('tipoUsuario');
    tipoUsuarioControl.setValue('');
    expect(tipoUsuarioControl.invalid).toBeTruthy();

    tipoUsuarioControl.setValue('ADMINISTRADOR');
    expect(tipoUsuarioControl.valid).toBeTruthy();

    tipoUsuarioControl.setValue('PROPIETARIO');
    expect(tipoUsuarioControl.valid).toBeTruthy();
  });

  it('should validate usuario field', () => {
    const usuarioControl = component.usuarioForm.get('usuario');
    usuarioControl.setValue('');
    expect(usuarioControl.invalid).toBeTruthy();

    usuarioControl.setValue('a'.repeat(51));
    expect(usuarioControl.invalid).toBeTruthy();

    usuarioControl.setValue('Usuario válido');
    expect(usuarioControl.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const passwordControl = component.usuarioForm.get('password');
    passwordControl.setValue('');
    expect(passwordControl.invalid).toBeTruthy();

    passwordControl.setValue('a'.repeat(51));
    expect(passwordControl.invalid).toBeTruthy();

    passwordControl.setValue('123');
    expect(passwordControl.invalid).toBeTruthy();

    passwordControl.setValue('ContraseñaVálida');
    expect(passwordControl.valid).toBeTruthy();
  });

  it('should validate confirmPassword field', () => {
    const confirmPasswordControl = component.usuarioForm.get('confirmPassword');
    confirmPasswordControl.setValue('');
    expect(confirmPasswordControl.invalid).toBeTruthy();

    confirmPasswordControl.setValue('a'.repeat(51));
    expect(confirmPasswordControl.invalid).toBeTruthy();

    confirmPasswordControl.setValue('123');
    expect(confirmPasswordControl.invalid).toBeTruthy();

    confirmPasswordControl.setValue('ContraseñaVálida');
    expect(confirmPasswordControl.valid).toBeTruthy();
  });

  it('should disable the submit button when the form is invalid', () => {
    // Simula un formulario inválido
    component.usuarioForm.setErrors({ invalid: true });

    // Forzar la detección de cambios después de cambiar el estado del formulario
    fixture.detectChanges();

    // Obtén el botón de envío
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    // Verifica que el botón esté deshabilitado
    expect(submitButton.disabled).toBeTruthy();
  });


});
