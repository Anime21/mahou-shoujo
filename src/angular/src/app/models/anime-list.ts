import { jsonArrayMember, jsonObject } from "typedjson";
import { Anime } from "./anime";

class AnimesMapper {

    static serialize(animes: Anime[]): string {
        let result: string = "{}";

        if (animes != null && animes.length > 0) {
            let _animes: {[k: string]: any} = {};
            animes.forEach(anime => _animes[anime.key] = anime);
            result = JSON.stringify(_animes);
        }

        return result;
    }

    static deserialize(json: any): Anime[] {
        let result: Anime[] = new Array<Anime>();

        for (const key in json) {
            result.push(new Anime(
                key,
                json[key].name,
                new Date(json[key]["first-run"] + "T00:00:00"),
                json[key].media,
                json[key].studio,
                json[key].type,
                json[key].target,
                json[key].links,
                json[key].notes,
                json[key].relations
            ));
        }

        return result;
    }
}

@jsonObject
export class AnimeList {

    private _animes: Anime[];

    constructor()
    constructor(theAnimes?: Anime[]) {
        if (typeof theAnimes === 'undefined') {
            this._animes = new Array<Anime>();
        } else {
            this._animes = theAnimes;
        }
    }

    @jsonArrayMember(Anime, {
        serializer: animes => AnimesMapper.serialize(animes),
        deserializer: json => AnimesMapper.deserialize(json)
    })
    public get animes(): Anime[] {
        return this._animes;
    }

    public set animes(theAnimes: Anime[]) {
        this._animes = theAnimes;
    }
}
