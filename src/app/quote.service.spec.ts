import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.get(QuoteService);
    expect(service).toBeTruthy();
  });
  it('should resolve to a quote', (done: DoneFn) => {
    const service = TestBed.get(QuoteService);
    service.getQuote().then(val => {
      expect(val).toBe(service.staticQuote);
      done();
    });
  });
});
