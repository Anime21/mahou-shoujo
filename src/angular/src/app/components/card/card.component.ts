import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/models/anime';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private router: Router;

  @Input()
  public anime: Anime = new Anime();

  @Input()
  public editable: boolean = false;

  constructor(theRouter: Router) {
    this.router = theRouter;
  }

  ngOnInit(): void {}

  public trackLinkChange(index: number, link: Link): string {
    return `${link.site}//${link.location}`;
  }

  public editClick() {
    this.router.navigateByUrl(`/edit/${this.anime.key}`);
  }

}
