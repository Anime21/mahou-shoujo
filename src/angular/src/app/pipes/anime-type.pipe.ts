import { Pipe, PipeTransform } from '@angular/core';
import { EnumType } from '../enums/enum-type.enum';

@Pipe({
  name: 'animeType'
})
export class AnimeTypePipe implements PipeTransform {

  private _types: Map<EnumType, string> = new Map<EnumType, string>([
    [EnumType.Original, "Original"],
    [EnumType.Manga, "Mangá"],
    [EnumType.LightNovel, "Light Novel"],
    [EnumType.VisualNovel, "Visual Novel"],
    [EnumType.Game, "Game"],
    [EnumType.Novel, "Livro"]
  ]);

  transform(value: EnumType): string {
    return this._types.get(value) || "";
  }

}
