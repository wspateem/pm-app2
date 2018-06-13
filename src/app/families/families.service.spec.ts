import { TestBed, inject } from '@angular/core/testing';

import { FamiliesService } from './families.service';

describe('FamiliesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamiliesService]
    });
  });

  it('should be created', inject([FamiliesService], (service: FamiliesService) => {
    expect(service).toBeTruthy();
  }));
});
