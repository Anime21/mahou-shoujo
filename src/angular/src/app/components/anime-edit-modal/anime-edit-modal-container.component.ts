import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AnimeEditModalComponent } from './anime-edit-modal.component';

@Component({
  selector: 'app-anime-edit-modal-container',
  template: ''
})
export class AnimeEditModalContainerComponent implements OnInit, OnDestroy {

  private destroy: Subject<any> = new Subject<any>();
  private _modal: MdbModalRef<AnimeEditModalComponent> | null = null;

  private modalService: MdbModalService;
  private route: ActivatedRoute;
  private router: Router;

  constructor(theModalService: MdbModalService, theRoute: ActivatedRoute, theRouter: Router) {
    this.modalService = theModalService;
    this.route = theRoute;
    this.router = theRouter;
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      let modalData: any = {};
      let id: string = params.animeId || "";

      if (id.length > 0) {
        modalData = { animeId: id };
      } else {
        modalData = { add: true };
      }

      this._modal = this.modalService.open(AnimeEditModalComponent, {
        data: modalData,
        modalClass: "modal-dialog-centered modal-xl modal-fullscreen-sm-down modal-dialog-scrollable anime-edit-modal"}
      );
  
      this._modal.onClose.subscribe(() => this.router.navigateByUrl('/'));
    });

    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).
      subscribe((event: NavigationStart) => this._modal?.close());
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

}
