import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnimesService } from 'src/app/services/animes/animes.service';
import { Anime } from 'src/app/models/anime';

import firebase from 'firebase/app';
import { AuthService, UserOrNull } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/auth/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _user: UserOrNull;

  @ViewChild('#dropdown')
  public dropdown!: any;

  private animesService: AnimesService;
  private authService: AuthService;

  @Input()
  public title: string = "";

  public get auth(): AuthService {
    return this.authService;
  }
  
  public get user(): UserOrNull {
    return this._user;
  }

  constructor(theAnimesService: AnimesService, theAuthService: AuthService) {
    this.animesService = theAnimesService;
    this.authService = theAuthService;
  }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => this._user = user
    );
  }

  saveAnimesClick(dropdown: HTMLButtonElement) {
    this.animesService.save();
    dropdown.click();
  }

  public saveHandler(theAnime: Anime | null) {
    if (theAnime != null) {
      this.animesService.addAnime(theAnime);
    }
  }

}
