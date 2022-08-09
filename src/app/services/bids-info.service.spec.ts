import { TestBed } from '@angular/core/testing';

import { BidsInfoService } from './bids-info.service';

describe('BidsInfoService', () => {
  let service: BidsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
