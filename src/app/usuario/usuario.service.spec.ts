//runs with ng test --include src/app/usuario/usuario.service.spec.ts

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = (Reflect as any).get(service, 'apiUrl');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve propietarios from API via GET', () => {
    const mockPropietarios: string[] = ['propietario1', 'propietario2', 'propietario3'];
    service.listarPropietarios().subscribe(prop => {
    expect(prop).toEqual(mockPropietarios);
    });

    const req = httpMock.expectOne(apiUrl + `/propietarios`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPropietarios);
  });

  
});
