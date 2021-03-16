import { FirebaseAnimesLoaderService } from "src/app/services/animes-loader/firebase-animes-loader.service";
import { LocalAnimesLoaderService } from "src/app/services/animes-loader/local-animes-loader.service";

export const environment = {
  production: false,
  animeLoaderService: FirebaseAnimesLoaderService,
  firebase: {
    apiKey: "AIzaSyB6BUee8BWbrZRRMGh-fbUAyv50oNo8FB0",
    authDomain: "a21-anime-list.firebaseapp.com",
    projectId: "a21-anime-list",
    storageBucket: "a21-anime-list.appspot.com",
    messagingSenderId: "386004006013",
    appId: "1:386004006013:web:d69157fff5c2040fdaed14"
  }
};
