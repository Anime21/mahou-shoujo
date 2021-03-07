import { Component, OnInit } from '@angular/core';
import { TypedJSON } from 'typedjson';
import { AnimeList } from './models/anime-list';
import { AnimesLoaderService } from './services/animes-loader-service.abstract';
import { GithubAnimesLoaderService } from './services/github-animes-loader.service';
import { LocalAnimesLoaderService } from './services/local-animes-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: AnimesLoaderService, useClass: GithubAnimesLoaderService }
  ]
})
export class AppComponent implements OnInit {

  public title = 'mahou-shoujo-app';

  private _animes: AnimeList = new AnimeList();

  public darkTheme: boolean = true;

  private animesLoaderService: AnimesLoaderService;

  constructor(theAnimesLoaderService: AnimesLoaderService) {
    this.animesLoaderService = theAnimesLoaderService;
  }

  public get animes(): AnimeList {
    return this._animes;
  }

  public set animes(theAnimes: AnimeList) {
    this._animes = theAnimes;
  }

  ngOnInit(): void {
    const animeMapper = new TypedJSON(AnimeList);

    this.animesLoaderService.load().subscribe(json => {
      let theAnimes = animeMapper.parse(json);
      if (typeof theAnimes !== 'undefined') {
        this.animes = theAnimes;
      }
    });

  }

  public switchDarkTheme() {
    this.darkTheme = !this.darkTheme;
  }

}
