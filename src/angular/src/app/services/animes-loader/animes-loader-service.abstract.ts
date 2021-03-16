import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnimeList } from "src/app/models/anime-list";

@Injectable()
export abstract class AnimesLoaderService {
    abstract load(ignoreCache?: boolean): Observable<any>;
    public save(theAnimeList: AnimeList): Promise<void> | null {
        throw "Não implementado";
    }
}
