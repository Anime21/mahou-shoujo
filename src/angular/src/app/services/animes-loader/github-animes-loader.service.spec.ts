import { TestBed } from '@angular/core/testing';

import { GithubAnimesLoaderService } from './github-animes-loader.service';

describe('GithubAnimesLoaderService', () => {
  let service: GithubAnimesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubAnimesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
