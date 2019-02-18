import { Component, OnInit } from '@angular/core';
import { QuoteService } from './quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _quoteService: QuoteService) {}
  title = 'promtest';
  quoteText = null;
  onClick() {
    this.loadQuote();
  }

  loadQuote() {
    this._quoteService
      .getQuote()
      .then(val => {
        this.quoteText = val;
      })
      .catch(err => console.log(err));
  }
}
