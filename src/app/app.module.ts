import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {firebaseConfig} from '../environments/firebase.config';
import {AngularFireModule} from 'angularfire2';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { RouterModule} from '@angular/router';
import { routerConfig} from './router.config';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SafeUrlPipe } from './security/safe-url.pipe';
import { ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService} from './security/auth.service';
import { AuthGuard} from './security/auth.guard';
import { HttpModule} from '@angular/http';
import { PersonResolver} from './persons/person.resolver';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
=======
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
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { ResetComponent } from './reset/reset.component';
<<<<<<< HEAD
import { FlexLayoutModule} from '@angular/flex-layout';
=======
import {FlexLayoutModule} from '@angular/flex-layout';
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
import { PersonsListComponent } from './persons/persons-list/persons-list.component';
import { PersonsService } from './persons/persons.service';
import { NewPersonComponent } from './persons/new-person/new-person.component';
import { PersonFormComponent } from './persons/person-form/person-form.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonSearchComponent } from './persons/person-search/person-search.component';
<<<<<<< HEAD
import { FamiliesListComponent } from './families/families-list/families-list.component';
import { FamiliesService} from './families/families.service';
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c


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
<<<<<<< HEAD
    PersonSearchComponent,
    FamiliesListComponent,
    FamilyDetailComponent
=======
    PersonSearchComponent
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
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
<<<<<<< HEAD
  providers: [AuthService, AuthGuard, PersonsService, PersonResolver, FamiliesService],
=======
  providers: [AuthService, AuthGuard, PersonsService, PersonResolver],
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
  bootstrap: [AppComponent]
})
export class AppModule { }


