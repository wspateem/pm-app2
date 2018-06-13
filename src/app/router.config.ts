

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
import { FamiliesListComponent } from './families/families-list/families-list.component';
<<<<<<< HEAD
import { FamilyDetailComponent } from './families//family-detail/family-detail.component';
=======
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
import { NewFamilyComponent } from './families/new-family/new-family.component';
import { FamilySearchComponent} from './families/family-search/family-search.component';
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

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
=======
        path: 'new-family',
        component: NewFamilyComponent,
        canActivate: [AuthGuard]
    },
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
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
<<<<<<< HEAD
=======
        path: 'family-search/:id',
        children: [

            {
                path: '',
                component: FamilyDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
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
            }

        ]
      },
      {
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
          path: 'persons',
          component: PersonsListComponent,
          canActivate: [AuthGuard]
      },
<<<<<<< HEAD
=======
      {
        path: 'families',
        component: FamiliesListComponent,
        canActivate: [AuthGuard]
      },
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

    {
        path: 'new',
        component: NewPersonComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view',
        component: PersonDetailComponent,
<<<<<<< HEAD
=======
        canActivate: [AuthGuard]
    },
    {
        path: 'view-family',
        component: FamilyDetailComponent,
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
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
<<<<<<< HEAD
    { path: 'person-form',
    component: PersonFormComponent,
    canActivate: [AuthGuard]

=======
    {
        path: 'family-search',
        component: FamilySearchComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'person-form',
        component: PersonFormComponent,
        canActivate: [AuthGuard]
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
    },
    {
        path: 'app-families-list',
        component: FamiliesListComponent,
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





