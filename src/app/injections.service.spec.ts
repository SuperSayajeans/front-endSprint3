import { TestBed, inject } from '@angular/core/testing';

import { InjectionsService } from './injections.service';

describe('InjectionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjectionsService]
    });
  });

  it('should be created', inject([InjectionsService], (service: InjectionsService) => {
    expect(service).toBeTruthy();
  }));
});
