import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.model';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


const message = 'hi';

@Injectable()
export class QuoteService {
  
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 5)}`
    return this.http
    .get(uri)
    .do((nextValue) => {
         if (!environment.production) {
           console.log(message, nextValue);
         }
      },
      (err) => {
        if (!environment.production) {
          console.log('ERROR >> ', message, err);
        }
      },
      () => {
        if (!environment.production) {
          console.log("completed - ", message);
        }      
      })
    .map(res => res.json() as Quote);
  }

  onSubmit({ value, valid }, e: Event) {

  }

}