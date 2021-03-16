import { TestBed } from '@angular/core/testing';

import { FirebaseAnimesLoaderService } from './firebase-animes-loader.service';

describe('FirebaseAnimesLoaderService', () => {
  let service: FirebaseAnimesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAnimesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
