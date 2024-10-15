import { TestBed } from '@angular/core/testing';

import { RecuperarpasswordService } from './recuperarpassword.service';

describe('RecuperarpasswordService', () => {
  let service: RecuperarpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
