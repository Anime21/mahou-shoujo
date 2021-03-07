import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimesLoaderService } from './animes-loader-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class GithubAnimesLoaderService implements AnimesLoaderService {

  private http: HttpClient;

  constructor(theHttp: HttpClient) {
    this.http = theHttp;
  }

  public load(ignoreCache?: boolean): Observable<any> {
    return this.http.get("https://api.github.com/repos/Anime21/mahou-shoujo/contents/data/animes.json",
        {headers: new HttpHeaders({"Accept": "application/vnd.github.v3.raw"})});
  }
}
