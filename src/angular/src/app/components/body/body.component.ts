import { Component, Input, OnInit } from '@angular/core';
import { AnimeList } from 'src/app/models/anime-list';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input()
  public animes: AnimeList = new AnimeList();

  constructor() { }

  ngOnInit(): void {
  }

}
