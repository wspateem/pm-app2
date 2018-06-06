import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {firebaseConfig} from '../environments/firebase.config';
import {AngularFireModule} from 'angularfire2';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {routerConfig} from './router.config';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SafeUrlPipe } from './security/safe-url.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './security/auth.service';
import {AuthGuard} from './security/auth.guard';
import {HttpModule} from '@angular/http';
import {PersonResolver} from './persons/person.resolver';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { ResetComponent } from './reset/reset.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PersonsListComponent } from './persons/persons-list/persons-list.component';
import { PersonsService } from './persons/persons.service';
import { NewPersonComponent } from './persons/new-person/new-person.component';
import { PersonFormComponent } from './persons/person-form/person-form.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonSearchComponent } from './persons/person-search/person-search.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SafeUrlPipe,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    PersonsListComponent,
    NewPersonComponent,
    PersonFormComponent,
    PersonDetailComponent,
    PersonSearchComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      RouterModule.forRoot(routerConfig),
      ReactiveFormsModule,
      HttpModule,
      BrowserAnimationsModule,
      MaterialModule,
      MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule

  ],
  providers: [AuthService, AuthGuard, PersonsService, PersonResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }


