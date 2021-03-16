import { Pipe, PipeTransform } from '@angular/core';
import { EnumSite } from '../enums/enum-site.enum';

@Pipe({
  name: 'animeSite'
})
export class AnimeSitePipe implements PipeTransform {

  private _sites: Map<EnumSite, string> = new Map<EnumSite, string>([
    [EnumSite.Website, "Website"],
    [EnumSite.Twitter, "Twitter"],
    [EnumSite.YoutubeChannel, "Canal no Youtube"],
    [EnumSite.YoutubePlaylist, "Playlist no Youtube"],
    [EnumSite.MyAnimeList, "MyAnimeList"],
    [EnumSite.Anilist, "AniList"],
    [EnumSite.AniDB, "AniDB"],
    [EnumSite.AnimeNewsNetwork, "Anime News Network"],
    [EnumSite.Kitsu, "Kitsu"],
    [EnumSite.LiveChart, "LiveChart"],
    [EnumSite.WikipediaPT, "Wikipédia (PT)"],
    [EnumSite.WikipediaEN, "Wikipédia (EN)"],
    [EnumSite.Fandom, "Fandom"]
  ]);

  transform(value: EnumSite): string {
    return this._sites.get(value) || "";
  }

}
