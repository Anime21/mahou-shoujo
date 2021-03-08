import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnumFilter } from 'src/app/enums/enum-filter.enum';
import { Anime } from 'src/app/models/anime';
import { AnimeList } from 'src/app/models/anime-list';
import { TypedJSON } from 'typedjson';
import { AnimesLoaderService } from '../animes-loader/animes-loader-service.abstract';

class Filters {
  name: string = "";
  media: string = "";
  type: string = "";
  target: string = "";
  studio: string = "";
  dateMin: Date | null = null;
  dateMax: Date | null = null;
}

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private filters: Filters = new Filters();

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

  public filter(filterBy: EnumFilter, expression: any) {
    switch (filterBy) {
      case EnumFilter.Name:
        this.filters.name = expression;
        break;
      case EnumFilter.Media:
        this.filters.media = expression;
        break;
      case EnumFilter.Type:
        this.filters.type = expression;
        break;
      case EnumFilter.Target:
        this.filters.target = expression;
        break;
      case EnumFilter.Studio:
        this.filters.studio = expression;
        break;
      case EnumFilter.DateMin:
        this.filters.dateMin = expression;
        break;
      case EnumFilter.DateMax:
        this.filters.dateMax = expression;
        break;
    }

    this.doFilter();
  }

  private doFilter() {
    let data: AnimeList = new AnimeList();
    let list: Anime[] = this.animesData.animes;
    let filtered: Anime[] = list;

    if (this.filters.name != "") {
      filtered = filtered.filter(
        anime => anime.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
      );
    }

    if (this.filters.media != "") {
      filtered = filtered.filter(
        anime => anime.media === this.filters.media
      )
    }

    if (this.filters.type != "") {
      filtered = filtered.filter(
        anime => anime.type === this.filters.type
      )
    }

    if (this.filters.target != "") {
      filtered = filtered.filter(
        anime => anime.target === this.filters.target
      )
    }

    if (this.filters.studio != "") {
      filtered = filtered.filter(
        anime => anime.studio.toLocaleLowerCase().includes(this.filters.studio.toLocaleLowerCase())
      );
    }

    if (this.filters.dateMin != null && !isNaN(this.filters.dateMin.getTime())) {
      let localDateMin: Date = this.filters.dateMin;
      filtered = filtered.filter(
        anime => anime.firstRun >= localDateMin
      )
    }

    if (this.filters.dateMax != null && !isNaN(this.filters.dateMax.getTime())) {
      let localDateMax: Date = this.filters.dateMax;
      filtered = filtered.filter(
        anime => anime.firstRun <= localDateMax
      )
    }

    data.animes = filtered;
    this._animes.next(data);
  }
}
