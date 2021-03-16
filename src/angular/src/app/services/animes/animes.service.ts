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
  updated: boolean = false;
}

enum OrderBy {
  Name,
  Date
}

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private filters: Filters = new Filters();

  private _orderBy: OrderBy = OrderBy.Date;

  private animesData: AnimeList = new AnimeList();

  private _animes: BehaviorSubject<AnimeList> = new BehaviorSubject<AnimeList>(this.animesData);

  private animesLoaderService: AnimesLoaderService;

  public readonly animes: Observable<AnimeList> = this._animes.asObservable();

  constructor(theAnimesLoaderService: AnimesLoaderService) {
    this.animesLoaderService = theAnimesLoaderService;
    this.init();
  }

  public get orderBy(): OrderBy {
    return this._orderBy;
  }

  public set orderBy(theOrderBy: OrderBy) {
    this._orderBy = theOrderBy;
    this.doFilter();
  }

  private init(): void {
    const animeMapper = new TypedJSON(AnimeList);

    this.animesLoaderService.load().subscribe(json => {
      let theAnimes = animeMapper.parse(json);
      if (typeof theAnimes !== 'undefined') {
        this.animesData = theAnimes;
        this.doFilter();
        this._animes.next(this.animesData);
      }
    });

    this.resetFiltersOrderBy();
  }

  public addAnime(theAnime: Anime) {
    let newAnime = Anime.clone(theAnime);
    let key: string = newAnime.key;
  
    if (key != '' && this.animesData.animes.findIndex(anime => anime.key == key) > -1) {
      throw "Anime já cadastrado";
    }

    if (newAnime.name == '') {
      throw "Anime sem nome"
    }

    newAnime.key = this.generateKey(newAnime.name);
    this.animesData.animes.push(newAnime);
    this.resetFiltersOrderBy();
    this.doFilter();
  }

  private generateKey(name: string): string {
    let result = name;

    const withDia = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const withoutDia = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'; 

    for (let i = 0; i < withDia.length; i++) {      
      result = result.replace(new RegExp(withDia[i], "g"), withoutDia[i]);
    }

    result = result.toLocaleLowerCase();
    result = result.replace(/[^A-Za-z0-9]/g, " ");
    result = result.replace(/^\s*|\s*$/g, "");
    result = result.replace(/\s\s+/g, " ");
    result = result.replace(/\s/g, "-");

    if (this.animesData.animes.findIndex(anime => anime.key == result) > -1) {
      let idx: number = 0;

      do idx++
      while (this.animesData.animes.findIndex(anime => anime.key == `${result}-${idx}`) > -1);

      result = `${result}-${idx}`;
    }

    return result;
  }

  private resetFiltersOrderBy() {
    this.filters = new Filters();
    this._orderBy = OrderBy.Date;
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
      case EnumFilter.Updated:
        this.filters.updated = expression;
    }

    this.doFilter();
  }

  private doFilter() {
    this.order();

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

    if (this.filters.updated) {
      filtered = filtered.filter(
        anime => anime.updated
      )
    }

    data.animes = filtered;
    this._animes.next(data);
  }

  public order(): void
  public order(theOrderBy?: OrderBy) {
    if (typeof theOrderBy !== 'undefined') {
      this._orderBy = theOrderBy;
    }

    this.animesData.animes.sort((a1, a2) => {
      let result: number;

      switch(this.orderBy) {
        case OrderBy.Name:
          result = a1.name.toLocaleLowerCase().localeCompare(
            a2.name.toLocaleLowerCase());
          break;
        case OrderBy.Date:
          result = a1.firstRun.getTime() - a2.firstRun.getTime();
      }

      return result;
    });
  }

  public getAnimeById(animeId: string): Anime | null {
    return this.animesData.animes.find(anime => anime.key == animeId) || null;
  }

  public save() {
    this.animesLoaderService.save(this.animesData)?.then(() => this.init);
  }
}
