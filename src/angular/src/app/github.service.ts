import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnimeList } from './models/anime-list';
import { TypedJSON } from 'typedjson';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private http: HttpClient;
  private animeMapper = new TypedJSON(AnimeList);

  constructor(theHttp: HttpClient) {
    this.http = theHttp;
  }

  public loadAnimes() {
    return this.http.get("https://api.github.com/repos/Anime21/mahou-shoujo/contents/data/animes.json",
        {headers: new HttpHeaders({"Accept": "application/vnd.github.v3.raw"})});
  }
}
