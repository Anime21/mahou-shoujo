import { Component, Input, OnInit } from '@angular/core';
import { AnimeList } from 'src/app/models/anime-list';
import { AnimesService } from 'src/app/services/animes/animes.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

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
