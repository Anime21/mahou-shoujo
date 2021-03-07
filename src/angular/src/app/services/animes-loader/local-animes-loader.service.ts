import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimesLoaderService } from './animes-loader-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class LocalAnimesLoaderService implements AnimesLoaderService {

  private http: HttpClient;

  constructor(theHttp: HttpClient) {
    this.http = theHttp;
  }

  public load(ignoreCache?: boolean): Observable<any> {
    return this.http.get("./assets/animes.json");
  }
}
