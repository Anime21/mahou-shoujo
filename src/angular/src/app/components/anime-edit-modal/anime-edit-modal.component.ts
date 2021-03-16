import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Anime } from 'src/app/models/anime';
import { AnimesService } from 'src/app/services/animes/animes.service';

@Component({
  selector: 'app-anime-edit-modal',
  templateUrl: './anime-edit-modal.component.html',
  styleUrls: ['./anime-edit-modal.component.scss']
})
export class AnimeEditModalComponent implements OnInit {

  public modalRef: MdbModalRef<AnimeEditModalComponent>;
  public animeId: string = "";
  private _anime: Anime = new Anime();

  @Input()
  public add: boolean = false;

  public get anime(): Anime {
    return this._anime;
  }

  private animesService: AnimesService;

  constructor(theModalRef: MdbModalRef<AnimeEditModalComponent>, theAnimesService: AnimesService) {
    this.modalRef = theModalRef;
    this.animesService = theAnimesService;
  }

  ngOnInit(): void {
    this._anime = this.animesService.getAnimeById(this.animeId) || new Anime();
  }

}
