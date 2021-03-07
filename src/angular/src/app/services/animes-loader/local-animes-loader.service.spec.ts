import { TestBed } from '@angular/core/testing';

import { LocalAnimesLoaderService } from './local-animes-loader.service';

describe('LocalAnimesLoaderService', () => {
  let service: LocalAnimesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalAnimesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
