import { Pipe, PipeTransform } from '@angular/core';
import { EnumSite } from '../enums/enum-site.enum';
import { Link } from '../models/link';

@Pipe({
  name: 'animeLink'
})
export class AnimeLinkPipe implements PipeTransform {

  private _links: Map<EnumSite, string> = new Map<EnumSite, string>([
    [EnumSite.AniDB, "https://anidb.net/anime/$1/"],
    [EnumSite.Anilist, "https://anilist.co/anime/$1/"],
    [EnumSite.AnimeNewsNetwork, "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=$1"],
    [EnumSite.Kitsu, "https://kitsu.io/anime/$1"],
    [EnumSite.LiveChart, "https://www.livechart.me/anime/$1"],
    [EnumSite.MyAnimeList, "https://myanimelist.net/anime/$1/"],
    [EnumSite.Website, "$1"]
  ]);

  transform(value: Link): string {
    return this._links.get(value.site)?.replace("$1", value.location) || "";
  }

}
