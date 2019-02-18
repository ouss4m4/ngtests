import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  public staticQuote = 'be patient';
  constructor() {}
  public getQuote() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.staticQuote);
      }, 350);
    });
  }
}
