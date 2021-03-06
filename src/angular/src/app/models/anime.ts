import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { EnumMedia } from "../enums/enum-media.enum";
import { EnumTarget } from "../enums/enum-target.enum";
import { EnumType } from "../enums/enum-type.enum";
import { Link } from "./link";
import { Relation } from "./relation";

@jsonObject
export class Anime {

    private _name: string;
    private _firstRun: Date;
    private _media: EnumMedia;
    private _studio: string;
    private _type: EnumType;
    private _target: EnumTarget;
    private _links: Link[];
    private _notes: string[];
    private _relations: Relation[];

    constructor()
    constructor(theName?: string, theFirstRun?: Date, theMedia?: EnumMedia, theStudio?: string, theType?: EnumType,
        theTarget?: EnumTarget, theLinks?: Link[], theNotes?: string[], theRelations?: Relation[]) {

        if (typeof theName === 'undefined') {
            this._name = "";
        } else {
            this._name = theName;
        }

        if (typeof theFirstRun === 'undefined') {
            this._firstRun = new Date();
        } else {
            this._firstRun = theFirstRun;
        }

        if (typeof theMedia === 'undefined') {
            this._media = EnumMedia.None;
        } else {
            this._media = theMedia;
        }

        if (typeof theStudio === 'undefined') {
            this._studio = "";
        } else {
            this._studio = theStudio;
        }

        if (typeof theType === 'undefined') {
            this._type = EnumType.None;
        } else {
            this._type = theType;
        }

        if (typeof theTarget === 'undefined') {
            this._target = EnumTarget.None;
        } else {
            this._target = theTarget;
        }

        if (typeof theLinks === 'undefined') {
            this._links = new Array<Link>();
        } else {
            this._links = theLinks;
        }

        if (typeof theNotes === 'undefined') {
            this._notes = new Array<string>();
        } else {
            this._notes = theNotes;
        }

        if (typeof theRelations === 'undefined') {
            this._relations = new Array<Relation>();
        } else {
            this._relations = theRelations;
        }
    }

    @jsonMember(String)
    public get name(): string {
        return this._name;
    }

    public set name(theName: string) {
        this._name = theName;
    }

    @jsonMember({
        name: 'first-run',
        serializer: value => JSON.stringify(value).substr(1, 10),
        deserializer: timestamp => new Date(timestamp + 'T00:00:00')
    })
    public get firstRun(): Date {
        return this._firstRun;
    }

    public set firstRun(theFirstRun: Date) {
        this._firstRun = theFirstRun;
    }

    @jsonMember({constructor: String})
    public get media(): EnumMedia {
        return this._media;
    }

    public set media(theMedia: EnumMedia) {
        this._media = theMedia;
    }

    @jsonMember(String)
    public get studio(): string {
        return this._studio;
    }

    public set studio(theStudio: string) {
        this._studio = theStudio;
    }

    @jsonMember({constructor: String})
    public get type(): EnumType {
        return this._type;
    }

    public set type(theType: EnumType) {
        this._type = theType;
    }

    @jsonMember({constructor: String})
    public get target(): EnumTarget {
        return this._target;
    }

    public set target(theTarget: EnumTarget) {
        this._target = theTarget;
    }

    @jsonArrayMember(Link)
    public get links(): Link[] {
        return this._links;
    }

    public set links(theLinks: Link[]) {
        this._links = theLinks;
    }

    @jsonArrayMember(String)
    public get notes(): string[] {
        return this._notes;
    }

    public set notes(theNotes: string[]) {
        this._notes = theNotes;
    }

    @jsonArrayMember(Relation)
    public get relations(): Relation[] {
        return this._relations;
    }

    public set relations(theRelations: Relation[]) {
        this._relations = theRelations;
    }
}
