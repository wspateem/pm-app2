

import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './security/auth.guard';
import { ResetComponent } from './reset/reset.component';
import {PersonResolver} from './persons/person.resolver';
import { PersonsListComponent } from './persons/persons-list/persons-list.component';
import { NewPersonComponent } from './persons/new-person/new-person.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { Component } from '@angular/core';
import { PersonSearchComponent } from './persons/person-search/person-search.component';
import { PersonFormComponent } from './persons/person-form/person-form.component';
<<<<<<< HEAD
import { FamiliesListComponent } from './families/families-list/families-list.component';
import { FamilyDetailComponent } from './families//family-detail/family-detail.component';
=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

export const routerConfig: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
<<<<<<< HEAD
        path: 'app-families-list',
        children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: FamilyDetailComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'new',
                        component: NewPersonComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: '',
                component: FamiliesListComponent,
                canActivate: [AuthGuard]
            }
        ]
},
    {
        path: 'person-search/:id',
        children: [

=======
        path: 'person-search/:id',
        children: [
           
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
            {
                path: '',
                component: PersonDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id2',
                children: [

                    {
                        path: '',
                        component: PersonFormComponent,
                        canActivate: [AuthGuard],
                        resolve: {
                            person: PersonResolver
                          }
                    }
                ]
            }
<<<<<<< HEAD

=======
           
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
        ]
      },
      {
          path: 'persons',
          component: PersonsListComponent,
          canActivate: [AuthGuard]
      },

    {
        path: 'new',
        component: NewPersonComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view',
        component: PersonDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reset',
        component: ResetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'person-search',
        component: PersonSearchComponent,
        canActivate: [AuthGuard]
    },
    { path: 'person-form',
    component: PersonFormComponent,
    canActivate: [AuthGuard]

    },
<<<<<<< HEAD
    {
        path: 'app-families-list',
        component: FamiliesListComponent,
        canActivate: [AuthGuard]
    },
=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];





