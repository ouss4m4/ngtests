import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { QuoteService } from './quote.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let quoteService: QuoteService;
  let quoteEl;
  const mockService = {
    staticQuote: 'testQuote',
    getQuote: function() {
      return Promise.resolve(mockService.staticQuote);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: QuoteService, useValue: mockService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    quoteService = TestBed.get(QuoteService);
    quoteEl = fixture.nativeElement.querySelector('.twain');
    fixture.detectChanges();
  });

  it('should show quote after getQuote (async)', async(() => {
    component.loadQuote();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe(quoteService.staticQuote);
    });
  }));

  it('should show quote with fakeAsync', fakeAsync(() => {
    component.loadQuote();
    tick();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe(quoteService.staticQuote);
  }));
});
