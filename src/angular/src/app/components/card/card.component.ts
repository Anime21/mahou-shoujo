import { Component, Input, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public anime: Anime = new Anime();

  constructor() { }

  ngOnInit(): void {
  }

}
