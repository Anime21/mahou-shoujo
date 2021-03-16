import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnumMedia } from 'src/app/enums/enum-media.enum';
import { EnumSite } from 'src/app/enums/enum-site.enum';
import { EnumTarget } from 'src/app/enums/enum-target.enum';
import { EnumType } from 'src/app/enums/enum-type.enum';
import { Anime } from 'src/app/models/anime';
import { Link } from 'src/app/models/link';
import { AnimesService } from 'src/app/services/animes/animes.service';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.scss']
})
export class AnimeFormComponent implements OnInit {

  private animesService: AnimesService;

  private oldAnime: Anime = new Anime();
  private newAnime: Anime = new Anime();

  private _add: boolean = false;

  public get anime(): Anime {
    return this.newAnime;
  }

  public get add(): boolean {
    return this._add;
  }

  @Input()
  public set add(isAdd: boolean) {
    this._add = isAdd;
  }

  @Input()
  public set anime(theAnime: Anime) {
    this.oldAnime = theAnime;
    this.newAnime = new Anime();
    this.newAnime.copy(this.oldAnime);
  }

  public mediaValues: EnumMedia[] = Object.values(EnumMedia);
  public typeValues: EnumType[] = Object.values(EnumType);
  public targetValues: EnumTarget[] = Object.values(EnumTarget);
  public siteValues: EnumSite[] = Object.values(EnumSite);

  constructor(theAnimesService: AnimesService) {
    this.animesService = theAnimesService;
  }

  ngOnInit(): void {}

  public collapseShowHandler() {
    if (this.newAnime.links == null || this.newAnime.links.length == 0) {
      this.addLink();
    }
  }

  public reset() {
    this.newAnime = Anime.clone(this.oldAnime);
  }

  public save() {
    this.oldAnime.copy(this.newAnime);
    if (this._add) {
      this.animesService.addAnime(this.oldAnime);
    }
  }

  public addLink() {
    this.newAnime.links.push(new Link());
  }

  public removeLink(index: number) {
    window.setTimeout(() => this.newAnime.links.splice(index, 1));
  }

}
