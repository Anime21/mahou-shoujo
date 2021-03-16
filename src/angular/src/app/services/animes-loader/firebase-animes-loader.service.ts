import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Anime } from 'src/app/models/anime';
import { AnimeList } from 'src/app/models/anime-list';
import { Link } from 'src/app/models/link';
import { AnimesLoaderService } from './animes-loader-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAnimesLoaderService extends AnimesLoaderService {

  private firestore: AngularFirestore;

  constructor(theFirestore: AngularFirestore) {
    super();
    this.firestore = theFirestore;
  }

  load(ignoreCache?: boolean): Observable<any> {
    return this.firestore.doc("/mahou-shoujo/list").valueChanges();
  }

  save(theAnimeList: AnimeList): Promise<void> | null {
    let animes: Array<Anime>;
    let payload: any = {};
  
    animes = theAnimeList.animes.
      filter(anime => anime.updated).
      map(anime => Anime.clone(anime));

    if (animes.length == 0) {
      return null;
    }

    animes.forEach(anime => {
      let key: string = anime.key;
      let firstRun: string = JSON.stringify(anime.firstRun).substr(1, 10)
      let links: Array<any> = anime.links.map(
        link => {
          return {"site": link.site, "location": link.location};
        });

      payload[`animes.${key}.name`] = anime.name;
      payload[`animes.${key}.first-run`] = firstRun;
      payload[`animes.${key}.media`] = anime.media;
      payload[`animes.${key}.studio`] = anime.studio;
      payload[`animes.${key}.type`] = anime.type;
      payload[`animes.${key}.target`] = anime.target;
      payload[`animes.${key}.links`] = links;
      payload[`animes.${key}.notes`] = anime.notes;
      payload[`animes.${key}.relations`] = anime.relations;
    });

    return this.firestore.doc("/mahou-shoujo/list").update(payload);
  }
}
