import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class Relation {

    private _anime: string;
    private _note: string;

    constructor()
    constructor(theAnime?: string, theNote?: string) {
        if (typeof theAnime === 'undefined') {
            this._anime = "";
        } else {
            this._anime = theAnime;
        }

        if (typeof theNote === 'undefined') {
            this._note = "";
        } else {
            this._note = theNote;
        }
    }

    @jsonMember(String)
    public get anime(): string {
        return this._anime;
    }

    public set anime(theAnime: string) {
        this._anime = theAnime;
    }

    @jsonMember(String)
    public get note(): string {
        return this._note;
    }

    public set note(theNote: string) {
        this._note = theNote;
    }
}
