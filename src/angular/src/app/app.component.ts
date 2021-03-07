import { Component, OnInit } from '@angular/core';
import { AnimeList } from './models/anime-list';
import { AnimesService } from './services/animes/animes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'mahou-shoujo-app';

  private animesService: AnimesService;

  private _animes: AnimeList = new AnimeList();

  constructor(theAnimesService: AnimesService) {
    this.animesService = theAnimesService;
  }

  public get animes(): AnimeList {
    return this._animes;
  }

  public set animes(theAnimes: AnimeList) {
    this._animes = theAnimes;
  }

  ngOnInit(): void {
    this.animesService.animes.subscribe(
      value => this._animes = value
    )
  }

}
