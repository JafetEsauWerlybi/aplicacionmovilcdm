import { TestBed } from '@angular/core/testing';

import { CambiarpasswordService } from './cambiarpassword.service';

describe('CambiarpasswordService', () => {
  let service: CambiarpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
