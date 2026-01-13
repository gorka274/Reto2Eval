import { TestBed } from '@angular/core/testing';

import { Serviciomaquina } from './serviciomaquina';

describe('Serviciomaquina', () => {
  let service: Serviciomaquina;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviciomaquina);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
