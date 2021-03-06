import { jsonMember, jsonObject } from "typedjson";
import { EnumSite } from "../enums/enum-site.enum";

@jsonObject
export class Link {

    private _site: EnumSite;
    private _location: string;

    constructor()
    constructor(theSite?: EnumSite, theLocation?: string) {
        if (typeof theSite === 'undefined') {
            this._site = EnumSite.None;
        } else {
            this._site = theSite;
        }

        if (typeof theLocation === "undefined") {
            this._location = "";
        } else {
            this._location = theLocation;
        }
    }

    @jsonMember(String)
    public get site(): EnumSite {
        return this._site;
    }

    public set site(theSite: EnumSite) {
        this._site = theSite;
    }

    @jsonMember(String)
    public get location(): string {
        return this._location;
    }

    public set location(theLocation: string) {
        this._location = theLocation;
    }
}
