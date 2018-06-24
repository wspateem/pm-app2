import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {firebaseConfig} from '../environments/firebase.config';
import {AngularFireModule} from 'angularfire2';
import { HomeComponent } from './home/home.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule } from '@angular/material';
import { ResetComponent } from './reset/reset.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { PersonsListComponent } from './persons/persons-list/persons-list.component';
import { PersonsService } from './persons/persons.service';
import { CalendarService} from './calendar/calendar.service';
import { NewPersonComponent } from './persons/new-person/new-person.component';
import { PersonFormComponent } from './persons/person-form/person-form.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonSearchComponent } from './persons/person-search/person-search.component';
import { FamiliesListComponent } from './families/families-list/families-list.component';
import { FamiliesService} from './families/families.service';
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
import { NewFamilyComponent } from './families/new-family/new-family.component';
import { FamilySearchComponent } from './families/family-search/family-search.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogComponent } from './calendar/dialog/dialog.component';
import { DialogComponentDetail } from './calendar/events-list/dialog-detail/dialog-detail.component';
import {DatePipe} from '@angular/common';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatInputModule, 
  MatListModule, 
  MatPaginatorModule, 
  MatProgressSpinnerModule, 
  MatSelectModule, 
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
  } from "@angular/material";
import { EventsListComponent } from './calendar/events-list/events-list.component';
import { EventSearchComponent } from './calendar/event-search/event-search.component';
import { EventsComponent } from './calendar/events/events.component';




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
    PersonSearchComponent,
    FamiliesListComponent,
    FamilyDetailComponent,
    NewFamilyComponent,
    FamilySearchComponent,
    CalendarComponent,
     DialogComponent,
     DialogComponentDetail,
     EventsListComponent,
     EventSearchComponent,
     EventsComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      RouterModule.forRoot(routerConfig),
      CalendarModule.forRoot(),
      ReactiveFormsModule,
      HttpModule,
      BrowserAnimationsModule,
      MaterialModule,
      MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule, 
    MatListModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSelectModule, 
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [AuthService, AuthGuard, PersonsService, PersonResolver, FamiliesService, CalendarService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogComponentDetail]
})
export class AppModule { }


