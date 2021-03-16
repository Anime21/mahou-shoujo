import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { EnumMedia } from "../enums/enum-media.enum";
import { EnumTarget } from "../enums/enum-target.enum";
import { EnumType } from "../enums/enum-type.enum";
import { Link } from "./link";
import { Relation } from "./relation";

const equal = require('fast-deep-equal/es6');
const observer = require('object-observer').Observable;

@jsonObject
export class Anime {

    private _key: string;
    private _name: string;
    private _firstRun: Date;
    private _media: EnumMedia;
    private _studio: string;
    private _type: EnumType;
    private _target: EnumTarget;

    private linksData: Link[];
    private _notes: string[];
    private _relations: Relation[];

    private linksObserver: Link[];

    private _updated: boolean = false;

    constructor()
    constructor(theKey: string, theName: string, theFirstRun: Date, theMedia: EnumMedia, theStudio: string, theType: EnumType,
        theTarget: EnumTarget, theLinks: Link[], theNotes: string[], theRelations: Relation[])
    constructor(theKey?: string, theName?: string, theFirstRun?: Date, theMedia?: EnumMedia, theStudio?: string, theType?: EnumType,
        theTarget?: EnumTarget, theLinks?: Link[], theNotes?: string[], theRelations?: Relation[]) {

        if (typeof theKey === 'undefined') {
            this._key = "";
        } else {
            this._key = theKey;
        }
    
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
            this.linksData = new Array<Link>();
        } else {
            this.linksData = theLinks;
        }
        let _linksObserver = observer.from(this.linksData);
        _linksObserver.observe(this.arrayChangeHandler.bind(this));
        this.linksObserver = _linksObserver;

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

    public static clone(theAnime: Anime): Anime {
        let newLinks: Array<Link> = theAnime.links.map(link => Link.clone(link));
        let newAnime: Anime = new Anime(
            theAnime.key,
            theAnime.name,
            theAnime.firstRun,
            theAnime.media,
            theAnime.studio,
            theAnime.type,
            theAnime.target,
            newLinks,
            theAnime.notes,
            theAnime.relations
        );
        newAnime._updated = theAnime.updated;

        return newAnime;
    }

    public copy(theAnime: Anime) {
        let newLinks: Array<Link> = theAnime.links.map(link => Link.clone(link));

        this.key = theAnime.key;
        this.name = theAnime.name;
        this.firstRun = theAnime.firstRun;
        this.media = theAnime.media;
        this.studio = theAnime.studio;
        this.type = theAnime.type;
        this.target = theAnime.target;
        this.links = newLinks;
        this.notes = theAnime.notes;
        this.relations = theAnime.relations;
        this._updated = theAnime.updated;
    }

    private arrayChangeHandler(changes: any) {
        if (Array.isArray(changes) && changes.length > 0) {
            if (changes[0].value != changes[0].oldValue) {
                this._updated = true;
            }
        }
    }

    public get key(): string {
        return this._key;
    }

    public set key(theKey: string) {
        this._updated = this._key != theKey;
        this._key = theKey;
    }

    @jsonMember(String)
    public get name(): string {
        return this._name;
    }

    public set name(theName: string) {
        this._updated = this._updated || this._name != theName;
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
        this._updated = this._updated || this._firstRun.valueOf() != theFirstRun.valueOf();
        this._firstRun = theFirstRun;
    }

    @jsonMember({constructor: String})
    public get media(): EnumMedia {
        return this._media;
    }

    public set media(theMedia: EnumMedia) {
        this._updated = this._updated || this._media != theMedia;
        this._media = theMedia;
    }

    @jsonMember(String)
    public get studio(): string {
        return this._studio;
    }

    public set studio(theStudio: string) {
        this._updated = this._updated || this._studio != theStudio;
        this._studio = theStudio;
    }

    @jsonMember({constructor: String})
    public get type(): EnumType {
        return this._type;
    }

    public set type(theType: EnumType) {
        this._updated = this._updated || this._type != theType;
        this._type = theType;
    }

    @jsonMember({constructor: String})
    public get target(): EnumTarget {
        return this._target;
    }

    public set target(theTarget: EnumTarget) {
        this._updated = this._updated || this._target != theTarget;
        this._target = theTarget;
    }

    @jsonArrayMember(Link)
    public get links(): Link[] {
        return this.linksObserver;
    }

    public set links(theLinks: Link[]) {
        this._updated = this._updated || !equal(this.linksData, theLinks);
        this.linksData = theLinks;

        let _linksObserver = observer.from(this.linksData);
        _linksObserver.observe(this.arrayChangeHandler.bind(this));
        this.linksObserver = _linksObserver;
    }

    @jsonArrayMember(String)
    public get notes(): string[] {
        return this._notes;
    }

    public set notes(theNotes: string[]) {
        this._updated = this._updated || !equal(this._notes, theNotes);
        this._notes = theNotes;
    }

    @jsonArrayMember(Relation)
    public get relations(): Relation[] {
        return this._relations;
    }

    public set relations(theRelations: Relation[]) {
        this._updated = this._updated || !equal(this._relations, theRelations);
        this._relations = theRelations;
    }

    public get updated(): boolean {
        return this._updated;
    }
}
