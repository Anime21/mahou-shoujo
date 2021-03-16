import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LocalDateValueAccessorModule } from 'angular-date-value-accessor';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MdbModule } from 'mdb-angular-ui-kit';
import { MdbDropdownModule } from 'mdb-angular-ui-kit';

import { environment } from 'src/environments/environment';

import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardComponent } from './components/card/card.component';
import { AnimeFormComponent } from './components/anime-form/anime-form.component';
import { AnimeEditModalContainerComponent } from './components/anime-edit-modal/anime-edit-modal-container.component';
import { AnimeEditModalComponent } from './components/anime-edit-modal/anime-edit-modal.component';

import { AnimesLoaderService } from './services/animes-loader/animes-loader-service.abstract';

import { AnimeMediaPipe } from './pipes/anime-media.pipe';
import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeTargetPipe } from './pipes/anime-target.pipe';
import { AnimeLinkPipe } from './pipes/anime-link.pipe';
import { AnimeSitePipe } from './pipes/anime-site.pipe';

import 'reflect-metadata';

const routes: Routes = [
  { path: "add", component: AnimeEditModalContainerComponent },
  { path: 'edit/:animeId', component: AnimeEditModalContainerComponent }
];

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
    FilterComponent,
    AnimeFormComponent,
    AnimeEditModalComponent,
    AnimeSitePipe,
    AnimeEditModalContainerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    LocalDateValueAccessorModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MdbModule,
    MdbDropdownModule
  ],
  providers: [
    { provide: AnimesLoaderService, useClass: environment.animeLoaderService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
