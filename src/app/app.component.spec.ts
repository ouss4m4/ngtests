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

  it('calls load quote  after onClick', () => {
    spyOn(component, 'loadQuote');
    spyOn(quoteService, 'getQuote');
    component.onClick();
    expect(component.loadQuote).toHaveBeenCalled();
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

  it('should call getQuote method on click', () => {
    // set up spies, could also call a fake method in case you don't want the API call to go through
    const userServiceSpy = spyOn(quoteService, 'getQuote').and.callThrough();
    const componentSpy = spyOn(component, 'loadQuote').and.callThrough();

    // make sure they haven't been called yet
    expect(userServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.onClick();

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });
});

// https://stackoverflow.com/questions/54669054/how-to-test-if-a-service-is-called-from-the-component-in-angular
