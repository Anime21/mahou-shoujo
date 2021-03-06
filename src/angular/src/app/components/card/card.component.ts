import { Component, Input, OnInit } from '@angular/core';
import { EnumTarget } from 'src/app/enums/enum-target.enum';
import { EnumType } from 'src/app/enums/enum-type.enum';
import { Anime } from 'src/app/models/anime';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public anime: Anime = new Anime();

  constructor() { }

  ngOnInit(): void {
  }

  public animeType(): string {
    let result: string = "Anime ";

    if (this.anime.type === EnumType.Original) {
      result += "original";
    } else {
      result += "adaptado de " + this.anime.type;
    }

    return result;
  }

  public animeTarget(): string {
    let result: string = " para ";

    switch (this.anime.target) {
      case EnumTarget.FemaleChild:
        result += "meninas";
        break;
      case EnumTarget.MaleChild:
        result += "meninos";
        break;
      case EnumTarget.Child:
        result += "crianças";
        break;
      case EnumTarget.FemaleTeen:
        result += "garotas adolescentes";
        break;
      case EnumTarget.MaleTeen:
        result += "garotos adolescentes";
        break;
      case EnumTarget.Teen:
        result += "adolescentes";
        break;
      case EnumTarget.FemaleYoungAdult:
        result += "mulheres jovens";
        break;
      case EnumTarget.MaleYoungAdult:
        result += "homens jovens";
        break;
      case EnumTarget.YoungAdult:
        result += "jovens adultos";
        break;
      case EnumTarget.FemaleAdult:
        result += "mulheres adultas";
        break;
      case EnumTarget.MaleAdult:
        result += "homens adultos";
        break;
      case EnumTarget.Adult:
        result += "adultos";
        break;
      case EnumTarget.Family:
        result += "toda a família";
        break;
      default:
        result = "";
        break;
    }

    return result;
  }
}
