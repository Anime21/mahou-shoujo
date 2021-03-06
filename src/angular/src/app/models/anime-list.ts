import { jsonArrayMember, jsonObject } from "typedjson";
import { Anime } from "./anime";

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

    @jsonArrayMember(Anime)
    public get animes(): Anime[] {
        return this._animes;
    }

    public set animes(theAnimes: Anime[]) {
        this._animes = theAnimes;
    }
}
