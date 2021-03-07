import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MdbModule } from 'mdb-angular-ui-kit';

import { environment } from 'src/environments/environment';

import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardComponent } from './components/card/card.component';

import { AnimesLoaderService } from './services/animes-loader/animes-loader-service.abstract';

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
    AnimeLinkPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MdbModule
  ],
  providers: [
    { provide: AnimesLoaderService, useClass: environment.animeLoaderService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
