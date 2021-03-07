import { Pipe, PipeTransform } from '@angular/core';
import { EnumMedia } from '../enums/enum-media.enum';

@Pipe({
  name: 'animeMedia'
})
export class AnimeMediaPipe implements PipeTransform {

  private _media: Map<EnumMedia, string> = new Map<EnumMedia, string>([
    [EnumMedia.TV, "TV"],
    [EnumMedia.OVA, "OVA"],
    [EnumMedia.ONA, "ONA"],
    [EnumMedia.Movie, "Filme"],
    [EnumMedia.Special, "Especial"],
    [EnumMedia.Hentai, "Hentai"]
  ]);

  transform(value: EnumMedia): string {
    return this._media.get(value) || "";
  }

}
