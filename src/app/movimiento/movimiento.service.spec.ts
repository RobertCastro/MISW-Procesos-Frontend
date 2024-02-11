import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MovimientoService } from './movimiento.service';

describe('Service: Movimiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Include HttpClientModule in imports
      providers: [MovimientoService]
    });
  });

  it('should ...', inject([MovimientoService], (service: MovimientoService) => {
    expect(service).toBeTruthy();
  }));
});
