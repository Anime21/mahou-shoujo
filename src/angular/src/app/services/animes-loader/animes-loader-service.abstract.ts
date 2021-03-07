import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AnimesLoaderService {
    abstract load(ignoreCache?: boolean): Observable<any>;
}
