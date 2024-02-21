//it runs with ng test --include='src\app\propiedad\propiedad-lista\propiedad-lista.component.spec.ts' 

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropiedadListaComponent } from './propiedad-lista.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EncabezadoAppModule } from 'src/app/encabezado-app/encabezado-app.module';
import { By } from '@angular/platform-browser';

describe('PropiedadListaComponent', () => {
  let component: PropiedadListaComponent;
  let fixture: ComponentFixture<PropiedadListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropiedadListaComponent],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,EncabezadoAppModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => '123' // Example value for paramMap
            }
          }
        }
      },
      ToastrService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadListaComponent);
    component = fixture.componentInstance;
    
    //mock propiedad
    component.propiedades = [
      { id: 1, nombre_propiedad: 'Propiedad 1', ciudad: 'Ciudad 1', municipio: 'Municipio 1', direccion: 'Direccion 1', nombre_propietario: 'Propietario 1', numero_contacto: 'Contacto 1', banco: 'Banco 1', numero_cuenta: 'Cuenta 1' },
      ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "Nombre" column', () => {
    const headerRows = fixture.nativeElement.querySelectorAll('th');
    let direccionColumnExists = false;
  
    headerRows.forEach(header => {
      if (header.textContent.trim() === 'Nombre') {
        direccionColumnExists = true;
      }
    });
  
    expect(direccionColumnExists).toBeTrue();
  });

  it('should not have "Direccion" column', () => {
    const headerRows = fixture.nativeElement.querySelectorAll('th');
    let direccionColumnExists = false;
  
    headerRows.forEach(header => {
      if (header.textContent.trim() === 'Dirección') {
        direccionColumnExists = true;
      }
    });
  
    expect(direccionColumnExists).toBeFalse();
  });

  it('should not have "Nombre propietario" column', () => {
    const headerRows = fixture.nativeElement.querySelectorAll('th');
    let direccionColumnExists = false;
  
    headerRows.forEach(header => {
      if (header.textContent.trim() === 'Nombre propietario') {
        direccionColumnExists = true;
      }
    });
  
    expect(direccionColumnExists).toBeFalse();
  });

  it('should not have "Contacto" column', () => {
    const headerRows = fixture.nativeElement.querySelectorAll('th');
    let direccionColumnExists = false;
  
    headerRows.forEach(header => {
      if (header.textContent.trim() === 'Contacto') {
        direccionColumnExists = true;
      }
    });
  
    expect(direccionColumnExists).toBeFalse();
  });

  it('should  have button with test_id="bot_ver"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_ver"]'));
    expect(button).toBeTruthy();
  });

  it('should  have button with test_id="bot_editar"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_editar"]'));
    expect(button).toBeTruthy();
  });

  it('should  have button with test_id="bot_eliminar"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_borrar"]'));
    expect(button).toBeTruthy();
  });

  it('should  have button with test_id="bot_movimientos"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_movimientos"]'));
    expect(button).toBeTruthy();
  });

  it('should  have button with test_id="bot_editar"', () => {
    const button = fixture.debugElement.query(By.css('[test-id="bot_editar"]'));
    expect(button).toBeTruthy();
  });

  it('no debe tener boton test_id="bot_editar" o test_id="bot_borrar" cuando el usuario es propietario', () => {
    component.usuarioEsPropietario=true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('[test-id="bot_editar"]'));
    const button2 = fixture.debugElement.query(By.css('[test-id="bot_borrar"]'));

    if (component.usuarioEsPropietario ){
      
      expect(button).toBeFalsy();
      expect(button2).toBeFalsy();
    }
    else {

      expect(button).toBeTruthy();
      expect(button2).toBeTruthy();
    }
  });

});
