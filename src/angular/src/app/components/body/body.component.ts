import { Component, OnInit } from '@angular/core';
import { AnimeList } from 'src/app/models/anime-list';
import { AnimesService } from 'src/app/services/animes/animes.service';
import { AuthService, UserOrNull } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  private animesService: AnimesService;

  private authService: AuthService;

  private _animes: AnimeList = new AnimeList();

  private _user: UserOrNull;

  constructor(theAnimesService: AnimesService, theAuthService: AuthService) {
    this.animesService = theAnimesService;
    this.authService = theAuthService;
  }

  public get animes(): AnimeList {
    return this._animes;
  }

  public set animes(theAnimes: AnimeList) {
    this._animes = theAnimes;
  }

  public get user(): UserOrNull {
    return this._user;
  }

  public get auth(): AuthService {
    return this.authService;
  }

  ngOnInit(): void {
    this.animesService.animes.subscribe(
      value => this._animes = value
    )

    this.authService.user.subscribe(
      user => this._user = user
    );
  }

}
