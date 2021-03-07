import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MdbModule } from 'mdb-angular-ui-kit';

import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { CardComponent } from './components/card/card.component';

import { AnimeMediaPipe } from './pipes/anime-media.pipe';
import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeTargetPipe } from './pipes/anime-target.pipe';
import { AnimeLinkPipe } from './pipes/anime-link.pipe';

import 'reflect-metadata';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CardComponent,
    AnimeMediaPipe,
    AnimeTypePipe,
    AnimeTargetPipe,
    AnimeLinkPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MdbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
