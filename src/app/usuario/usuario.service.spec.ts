//runs with ng test --include src/app/usuario/usuario.service.spec.ts

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { Propietario } from './usuario';

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
    const mockPropietarios: Propietario[] = [{'nombre':'propietario1','celular':'1'},{'nombre':'propietario2','celular':'2'},{'nombre':'propietario3','celular':'3'}];
    
    service.listarPropietarios().subscribe(prop => {
    expect(prop).toEqual(mockPropietarios);
    });

    const req = httpMock.expectOne(apiUrl + `/propietarios`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPropietarios);
  });

  
});
