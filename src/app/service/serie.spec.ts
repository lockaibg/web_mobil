import { TestBed } from '@angular/core/testing';

import { EpisodeService } from './episode';

describe('Episode', () => {
  let service: EpisodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
