import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CreatePostComponent} from './createPost/createPost.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WebApiService} from './Services/web-api.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatList, MatProgressSpinnerModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {DisplayPostsForActivityComponent} from './display-posts-for-activity/display-posts-for-activity.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {CreditsComponent} from './credits/credits.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {DisplayActivitiesComponent} from './display-activities/display-activities.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DisplayTripComponent} from './display-trip/display-trip.component';
import {CreateTripComponent} from './create-trip/create-trip.component';
import {FindUserComponent} from './find-user/find-user.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {InvitedUsersComponent} from './invited-users/invited-users.component';
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {DisplayPostDetailsComponent} from './display-post-details/display-post-details.component';
import {AutocompleteComponent} from './Services/google-places.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    CreateActivityComponent,
    DisplayPostsForActivityComponent,
    CreditsComponent,
    LoginComponent,
    DisplayActivitiesComponent,
    NavbarComponent,
    DisplayTripComponent,
    CreateTripComponent,
    FindUserComponent,
    InvitedUsersComponent,
    DisplayPostDetailsComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NgbModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'trips', component: DisplayTripComponent},
      {path: 'trips/create-trip', component: CreateTripComponent}, // pour le modale de cree un voyage ... ne sera jamais routé
      {path: 'FindUser', component: FindUserComponent}, // pour le modale de trouver un utilisateur ... ne sera jamais routé
      {path: 'PostDetails', component: DisplayPostDetailsComponent}, // pour le modale de details de post ... ne sera jamais routé
      {path: 'SeeUsersInTrip', component: InvitedUsersComponent}, // pour le modale voir utilisateur dans un voyage ... ne sera jamais routé
      {path: ':trip/create-activity', component: CreateActivityComponent}, // pour le modal pour cree une activite .. ne sera jamais routé
      {path: 'trip/:tripId/activities', component: DisplayActivitiesComponent}, // route vers la liste des activitée pour un voyage, prend un parametre tripId
      {path: 'trip/:tripId/activity/:activityId/create-post', component: CreatePostComponent},
      {path: 'trip/:tripId/activity/:activityId/posts', component: DisplayPostsForActivityComponent}, // route vers display posts avec parametre activity id

      {path: '**', redirectTo: 'trips'}
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrNv1urfbos48QR2TFJRo7yhKrIfC9k9M'
    }),
    AgmJsMarkerClustererModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
