import { Component, OnInit } from '@angular/core';
import { EnumFilter } from 'src/app/enums/enum-filter.enum';
import { AnimesService } from 'src/app/services/animes/animes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private _name: string = "";

  private animesService: AnimesService;

  constructor(theAnimesService: AnimesService) {
    this.animesService = theAnimesService;
  }

  public get name(): string {
    return this._name;
  }

  public set name(theName: string) {
    this._name = theName;
    this.nameChangeHandler();
  }

  ngOnInit(): void {
  }

  private nameChangeHandler() {
    if (this._name.length === 0 || this._name.length > 2) {
      this.animesService.filter(EnumFilter.Name, this._name);
    }
  }

}
