

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
        path: 'person-search/:id',
        children: [
           
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





