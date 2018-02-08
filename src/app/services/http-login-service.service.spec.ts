import { TestBed, inject } from '@angular/core/testing';

import { HttpLoginServiceService } from './http-login-service.service';

describe('HttpLoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpLoginServiceService]
    });
  });

  it('should be created', inject([HttpLoginServiceService], (service: HttpLoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
