import { TestBed } from '@angular/core/testing';

import { Serviciousuario } from './serviciousuario';

describe('Serviciousuario', () => {
  let service: Serviciousuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviciousuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
