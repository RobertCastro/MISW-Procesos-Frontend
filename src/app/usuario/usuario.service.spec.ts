//runs with ng test --include src/app/usuario/usuario.service.spec.ts

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' listarPropietarios() should return data', () => {
    const mockPropietarios = [
      { id: 1, nombre: 'Juan', apellidos: 'Perez', tipoIdentificacion: 'CC', identificacion: '123456789'}
    ];

    service.listarPropietarios().subscribe(prop => {
      expect(prop.length).toBe(1);
      expect(prop).toEqual(mockPropietarios);
    });


  
});
