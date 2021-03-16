import { jsonMember, jsonObject } from "typedjson";
import { EnumSite } from "../enums/enum-site.enum";

@jsonObject
export class Link {

    @jsonMember(String)
    public site: EnumSite;

    @jsonMember(String)
    public location: string;

    constructor()
    constructor(theSite: EnumSite, theLocation: string)
    constructor(theSite?: EnumSite, theLocation?: string) {
        if (typeof theSite === 'undefined') {
            this.site = EnumSite.None;
        } else {
            this.site = theSite;
        }

        if (typeof theLocation === "undefined") {
            this.location = "";
        } else {
            this.location = theLocation;
        }
    }

    public static clone(theLink: Link) {
        return new Link(
            theLink.site,
            theLink.location
        );
    }

}
