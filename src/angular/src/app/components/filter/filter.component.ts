import { Component, OnInit } from '@angular/core';
import { EnumFilter } from 'src/app/enums/enum-filter.enum';
import { EnumMedia } from 'src/app/enums/enum-media.enum';
import { EnumTarget } from 'src/app/enums/enum-target.enum';
import { EnumType } from 'src/app/enums/enum-type.enum';
import { AnimesService } from 'src/app/services/animes/animes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private _name: string = "";

  private _media: EnumMedia = EnumMedia.None;

  private _type: EnumType = EnumType.None;

  private _target: EnumTarget = EnumTarget.None;

  private _studio: string = "";

  private _dateMin: string = "";

  private _dateMax: string = "";

  public mediaValues: EnumMedia[];

  public typeValues: EnumType[];

  public targetValues: EnumTarget[];

  private animesService: AnimesService;

  constructor(theAnimesService: AnimesService) {
    this.animesService = theAnimesService;
    this.mediaValues = Object.values(EnumMedia);
    this.typeValues = Object.values(EnumType);
    this.targetValues = Object.values(EnumTarget);
  }

  public get name(): string {
    return this._name;
  }

  public set name(theName: string) {
    if (theName === null) {
      this._name = "";
    } else {
      this._name = theName;
    }

    this.nameChangeHandler();
  }

  public get media(): EnumMedia {
    return this._media;
  }

  public set media(theMedia: EnumMedia) {
    if (theMedia === null) {
      this._media = EnumMedia.None;
    } else {
      this._media = theMedia;
    }

    this.mediaChangeHandler();
  }

  public get type(): EnumType {
    return this._type;
  }

  public set type(theType: EnumType) {
    if (theType === null) {
      this._type = EnumType.None;
    } else {
      this._type = theType;
    }

    this.typeChangeHandler();
  }

  public get target(): EnumTarget {
    return this._target;
  }

  public set target(theTarget: EnumTarget) {
    if (theTarget === null) {
      this._target = EnumTarget.None;
    } else {
      this._target = theTarget;
    }

    this.targetChangeHandler();
  }

  public get studio(): string {
    return this._studio;
  }

  public set studio(theStudio: string) {
    if (theStudio === null) {
      this._studio = "";
    } else {
      this._studio = theStudio;
    }

    this.studioChangeHandler();
  }

  public get dateMin(): string {
    return this._dateMin;
  }

  public set dateMin(theDate: string) {
    if (theDate === null) {
      this._dateMin = "";
    } else {
      this._dateMin = theDate;
    }

    this.dateMinChangeHandler();
  }

  public get dateMax(): string {
    return this._dateMax;
  }

  public set dateMax(theDate: string) {
    if (theDate === null) {
      this._dateMax = "";
    } else {
      this._dateMax = theDate;
    }

    this.dateMaxChangeHandler();
  }

  ngOnInit(): void {
  }

  private nameChangeHandler() {
    if (this._name.length === 0 || this._name.length > 2) {
      this.animesService.filter(EnumFilter.Name, this._name);
    }
  }

  private mediaChangeHandler() {
    this.animesService.filter(EnumFilter.Media, this._media);
  }

  private typeChangeHandler() {
    this.animesService.filter(EnumFilter.Type, this._type);
  }

  private targetChangeHandler() {
    this.animesService.filter(EnumFilter.Target, this._target);
  }

  private studioChangeHandler() {
    if (this._studio.length === 0 || this._studio.length > 2) {
      this.animesService.filter(EnumFilter.Studio, this._studio);
    }
  }

  private dateMinChangeHandler() {
    this.animesService.filter(EnumFilter.DateMin, new Date(this._dateMin + "T00:00:00"));
  }

  private dateMaxChangeHandler() {
    this.animesService.filter(EnumFilter.DateMax, new Date(this._dateMax + "T00:00:00"));
  }
}
