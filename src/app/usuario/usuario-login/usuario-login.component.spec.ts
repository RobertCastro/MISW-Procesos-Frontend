import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { UsuarioLoginComponent } from './usuario-login.component';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({template: ''})
class DummyComponent {}

describe('UsuarioLoginComponent', () => {
  let component: UsuarioLoginComponent;
  let fixture: ComponentFixture<UsuarioLoginComponent>;
  let jwtHelper: JwtHelperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'propiedades', component: DummyComponent }
        ])
      ],
      declarations: [UsuarioLoginComponent, DummyComponent],
      providers: [UsuarioService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]
    }).compileComponents();

    jwtHelper = TestBed.inject(JwtHelperService);
    fixture = TestBed.createComponent(UsuarioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería extraer el rol del token al hacer login', (done) => {
    spyOn(component['usuarioService'], 'login').and.returnValue(of({ token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwODQ3MjgyNywianRpIjoiOTQxZGI1ZmMtYmYyNS00MjUyLTk5OWQtODIyYmRlZTQzODhiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NSwibmJmIjoxNzA4NDcyODI3LCJjc3JmIjoiMTRjOTAyMzAtMDY4OS00ZmUxLWI3MzgtMzljMjMwZDBhY2Q2IiwiZXhwIjoxNzA4NDczNzI3LCJyb2wiOiJBRE1JTklTVFJBRE9SIn0.yM4ej0bxsnCKKGmKDSEIyt-Is8T9eTnHEBM0k3gmULw' }));
    spyOn(jwtHelper, 'decodeToken').and.returnValue({ rol: 'ADMINISTRADOR' });

    component.loginUsuario('test_user', '123456');

    fixture.whenStable().then(() => {
      const storedToken = sessionStorage.getItem('decodedToken') || '{}';
      const decodedToken = JSON.parse(storedToken);
      expect(decodedToken.rol).toEqual('ADMINISTRADOR');
      done();
    });
  });
});
