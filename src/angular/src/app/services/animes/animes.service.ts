import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnumFilter } from 'src/app/enums/enum-filter.enum';
import { Anime } from 'src/app/models/anime';
import { AnimeList } from 'src/app/models/anime-list';
import { TypedJSON } from 'typedjson';
import { AnimesLoaderService } from '../animes-loader/animes-loader-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private animesData: AnimeList = new AnimeList();

  private _animes: BehaviorSubject<AnimeList> = new BehaviorSubject<AnimeList>(this.animesData);

  private animesLoaderService: AnimesLoaderService;

  public readonly animes: Observable<AnimeList> = this._animes.asObservable();

  constructor(theAnimesLoaderService: AnimesLoaderService) {
    this.animesLoaderService = theAnimesLoaderService;
    this.init();
  }

  private init(): void {
    const animeMapper = new TypedJSON(AnimeList);

    this.animesLoaderService.load().subscribe(json => {
      let theAnimes = animeMapper.parse(json);
      if (typeof theAnimes !== 'undefined') {
        this.animesData = theAnimes;
        this._animes.next(this.animesData);
      }
    });

  }

  public filter(filterBy: EnumFilter, expression: string) {
    let data: AnimeList = new AnimeList();
    let list: Anime[] = this.animesData.animes;
    let filtered: Anime[] = new Array<Anime>();

    if (filterBy === EnumFilter.Name) {
      if (expression === "") {
        filtered = list;
      } else {
        filtered = list.filter(
          anime => anime.name.toLocaleLowerCase().includes(expression)
        );
      }
    }

    data.animes = filtered;
    this._animes.next(data);
  }
}
