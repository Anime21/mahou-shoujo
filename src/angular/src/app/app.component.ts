import { Component, OnInit } from '@angular/core';
import { TypedJSON } from 'typedjson';
import { GithubService } from './github.service';
import { AnimeList } from './models/anime-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'mahou-shoujo-app';

  private _animes: AnimeList = new AnimeList();

  public darkTheme: boolean = true;

  private githubService: GithubService;

  constructor(theGithubService: GithubService) {
    this.githubService = theGithubService;
  }

  public get animes(): AnimeList {
    return this._animes;
  }

  public set animes(theAnimes: AnimeList) {
    this._animes = theAnimes;
  }

  ngOnInit(): void {
    //const json = this.githubService.loadAnimes(); //'{"animes":[{"name":"Mahoutsukai Sally","first-run":"1966-12-05","media":"TV","studio":"Toei","type":"manga","target":"female child","links":[{"site":"MAL","location":"3356"}],"notes":["Sally é garota mágica natural que vem de outro mundo para a Terra viver uma vida ordinária.","Segundo mangá, primeiro anime de garota mágica"]}]}';

    const animeMapper = new TypedJSON(AnimeList);

    this.githubService.loadAnimes().subscribe(json => {
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
