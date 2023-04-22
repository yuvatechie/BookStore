import { TestBed } from '@angular/core/testing';

import { BookAppService } from './book-app.service';

describe('BookAppService', () => {
  let service: BookAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
